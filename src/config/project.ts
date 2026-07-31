import { getAddress } from "viem";

export type SiteMode = "prelaunch" | "live";

type Address = `0x${string}` | "";

export interface ProjectConfig {
  mode: SiteMode;
  token: {
    name: string;
    symbol: string;
    address: Address;
    quoteSymbol: string;
    quoteAddress: `0x${string}`;
    poolAddress: Address;
    rewardsVaultAddress: Address;
  };
  network: {
    name: string;
    chainId: number;
    explorerBaseUrl: string;
    rpcUrl: string;
  };
  launch: {
    platform: string;
    flapUrl: string;
    dexScreenerUrl: string;
    gmgnUrl: string;
  };
  economics: {
    buyTaxBps: number;
    sellTaxBps: number;
    minimumEligibleBalance: number;
    rewardAllocationBps: number;
  };
  socials: {
    x: string;
    telegram: string;
    discord: string;
  };
}

const env = import.meta.env;

function numberEnv(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function addressEnv(value: string | undefined): Address {
  if (!/^0x[a-fA-F0-9]{40}$/.test(value ?? "")) return "";

  try {
    return getAddress(value as `0x${string}`);
  } catch {
    return "";
  }
}

const gameAddress = addressEnv(env.VITE_GAME_ADDRESS);
const poolAddress = addressEnv(env.VITE_POOL_ADDRESS);

export const projectConfig: ProjectConfig = {
  mode: env.VITE_GAMECOIN_MODE === "live" ? "live" : "prelaunch",
  token: {
    name: "GameCoin",
    symbol: "GAME",
    address: gameAddress,
    quoteSymbol: "GME",
    quoteAddress:
      addressEnv(env.VITE_GME_ADDRESS) ||
      "0x1b0e319c6a659f002271b69db8a7df2f911c153e",
    poolAddress,
    rewardsVaultAddress: addressEnv(env.VITE_REWARDS_VAULT_ADDRESS),
  },
  network: {
    name: "Robinhood Chain",
    chainId: 4663,
    explorerBaseUrl: "https://robinhoodchain.blockscout.com",
    rpcUrl: env.VITE_RPC_URL || "",
  },
  launch: {
    platform: "Flap",
    flapUrl:
      env.VITE_FLAP_URL ||
      (gameAddress ? `https://flap.sh/robinhood/${gameAddress}` : ""),
    dexScreenerUrl: env.VITE_DEXSCREENER_URL || "",
    gmgnUrl: env.VITE_GMGN_URL || "",
  },
  economics: {
    buyTaxBps: numberEnv(env.VITE_BUY_TAX_BPS, 300),
    sellTaxBps: numberEnv(env.VITE_SELL_TAX_BPS, 300),
    minimumEligibleBalance: numberEnv(env.VITE_MIN_ELIGIBLE_GAME, 10_000),
    rewardAllocationBps: numberEnv(env.VITE_REWARD_ALLOCATION_BPS, 10_000),
  },
  socials: {
    x: env.VITE_X_URL || "",
    telegram: env.VITE_TELEGRAM_URL || "",
    discord: env.VITE_DISCORD_URL || "",
  },
};

export const isLive =
  projectConfig.mode === "live" &&
  Boolean(projectConfig.token.address && projectConfig.token.poolAddress);

export function bpsToPercent(bps: number): string {
  return `${(bps / 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
}

export function explorerAddressUrl(address: string): string {
  return `${projectConfig.network.explorerBaseUrl}/address/${address}`;
}

export function explorerTokenUrl(address: string): string {
  return `${projectConfig.network.explorerBaseUrl}/token/${address}`;
}

export function explorerTxUrl(hash: string): string {
  return `${projectConfig.network.explorerBaseUrl}/tx/${hash}`;
}
