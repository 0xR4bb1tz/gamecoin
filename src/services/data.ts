import { z } from "zod";
import { projectConfig } from "../config/project";
import type { LiveData } from "../types/data";

const nullableNumber = z.number().finite().nullable();

const liveDataSchema = z.object({
  market: z.object({
    priceGme: nullableNumber,
    priceUsd: nullableNumber,
    marketCapUsd: nullableNumber,
    liquidityUsd: nullableNumber,
    volume24hUsd: nullableNumber,
    holders: nullableNumber,
    eligibleHolders: nullableNumber,
    updatedAt: z.string(),
  }),
  rewards: z.object({
    totalDistributedGme: nullableNumber,
    totalDistributedUsd: nullableNumber,
    awaitingDistributionGme: nullableNumber,
    activeEarners: nullableNumber,
    payouts: z.array(
      z.object({
        hash: z.string(),
        recipient: z.string(),
        amountGme: z.number().finite(),
        timestamp: z.string(),
      }),
    ),
  }),
  trades: z.array(
    z.object({
      hash: z.string(),
      side: z.enum(["buy", "sell"]),
      gameAmount: z.number().finite(),
      valueGme: nullableNumber,
      valueUsd: nullableNumber,
      wallet: z.string(),
      timestamp: z.string(),
    }),
  ),
});

export async function fetchLiveData(signal?: AbortSignal): Promise<LiveData | null> {
  const params = new URLSearchParams({
    token: projectConfig.token.address,
    pool: projectConfig.token.poolAddress,
  });
  const response = await fetch(`/api/live?${params.toString()}`, {
    headers: { accept: "application/json" },
    signal,
  });

  if (response.status === 204 || response.status === 404) return null;
  if (!response.ok) throw new Error(`Live data provider returned ${response.status}`);

  const parsed = liveDataSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("Live data response did not match the expected format");
  return parsed.data;
}
