interface Env {
  ASSETS: Fetcher;
}

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const CACHE_SECONDS = 20;
const BLOCKSCOUT = "https://robinhoodchain.blockscout.com";

function finiteNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

async function fetchJson(url: string): Promise<unknown | null> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "GameCoin-Public-Data/1.0",
    },
    cf: {
      cacheEverything: true,
      cacheTtl: CACHE_SECONDS,
    },
  });

  if (!response.ok) return null;
  return response.json();
}

interface DexPair {
  priceNative?: string;
  priceUsd?: string;
  marketCap?: number;
  fdv?: number;
  liquidity?: { usd?: number };
  volume?: { h24?: number };
}

function readDexPair(payload: unknown): DexPair | null {
  if (!payload || typeof payload !== "object") return null;
  const pairs = (payload as { pairs?: unknown }).pairs;
  if (!Array.isArray(pairs) || !pairs[0] || typeof pairs[0] !== "object") return null;
  return pairs[0] as DexPair;
}

function readHolderCount(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  return (
    finiteNumber(record.token_holders_count) ??
    finiteNumber(record.holders_count) ??
    finiteNumber(record.holders)
  );
}

async function liveData(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const pool = url.searchParams.get("pool") ?? "";

  if (!ADDRESS_PATTERN.test(token) || !ADDRESS_PATTERN.test(pool)) {
    return json({ error: "Live token and pool addresses are not configured" }, 404);
  }

  const cacheKey = new Request(url.toString(), { method: "GET" });
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const [dexPayload, holderPayload] = await Promise.all([
    fetchJson(`https://api.dexscreener.com/latest/dex/pairs/robinhood/${pool}`),
    fetchJson(`${BLOCKSCOUT}/api/v2/tokens/${token}/counters`),
  ]);

  const pair = readDexPair(dexPayload);
  const holders = readHolderCount(holderPayload);

  if (!pair && holders === null) {
    return json({ error: "Public market providers are temporarily unavailable" }, 503);
  }

  const response = json({
    market: {
      priceGme: finiteNumber(pair?.priceNative),
      priceUsd: finiteNumber(pair?.priceUsd),
      marketCapUsd: finiteNumber(pair?.marketCap) ?? finiteNumber(pair?.fdv),
      liquidityUsd: finiteNumber(pair?.liquidity?.usd),
      volume24hUsd: finiteNumber(pair?.volume?.h24),
      holders,
      eligibleHolders: null,
      updatedAt: new Date().toISOString(),
    },
    rewards: {
      totalDistributedGme: null,
      totalDistributedUsd: null,
      awaitingDistributionGme: null,
      activeEarners: null,
      payouts: [],
    },
    trades: [],
    notableHolders: [],
  });

  await cache.put(cacheKey, response.clone());
  return response;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/live" && request.method === "GET") {
      return liveData(request);
    }

    if (url.pathname === "/api/health") {
      return json({ ok: true, service: "gamecoin-public-data" });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
