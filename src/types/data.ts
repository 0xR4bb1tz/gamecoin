export interface MarketSnapshot {
  priceGme: number | null;
  priceUsd: number | null;
  marketCapUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  holders: number | null;
  eligibleHolders: number | null;
  updatedAt: string;
}

export interface RewardSnapshot {
  totalDistributedGme: number | null;
  totalDistributedUsd: number | null;
  awaitingDistributionGme: number | null;
  activeEarners: number | null;
  payouts: RewardPayout[];
}

export interface RewardPayout {
  hash: string;
  recipient: string;
  amountGme: number;
  timestamp: string;
}

export interface Trade {
  hash: string;
  side: "buy" | "sell";
  gameAmount: number;
  valueGme: number | null;
  valueUsd: number | null;
  wallet: string;
  timestamp: string;
}

export interface LiveData {
  market: MarketSnapshot;
  rewards: RewardSnapshot;
  trades: Trade[];
}

export type DataState =
  | { status: "prelaunch"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: LiveData; error: null }
  | { status: "empty"; data: null; error: null }
  | { status: "error"; data: null; error: string };
