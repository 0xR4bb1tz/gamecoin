import { getAddress } from "viem";

type Address = `0x${string}` | "";

export interface ProjectConfig {
  token: {
    name: string;
    symbol: string;
    address: Address;
    quoteSymbol: string;
    quoteAddress: `0x${string}`;
    poolAddress: Address;
    dividendDistributorAddress: Address;
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
    originPostUrl: string;
  };
  economics: {
    totalSupply: number;
    buyTaxBps: number;
    sellTaxBps: number;
    minimumEligibleBalance: number;
    rewardAllocationBps: number;
    marketingBps: number;
    deflationBps: number;
    liquidityBps: number;
    commissionBps: number;
  };
  media: {
    originCampaign: string;
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

const gameAddress = addressEnv(env.VITE_GAMECOIN_ADDRESS || env.VITE_GAME_ADDRESS);
const poolAddress = addressEnv(env.VITE_POOL_ADDRESS);

export const projectConfig: ProjectConfig = {
  token: {
    name: "GameCoin",
    symbol: "GAMECOIN",
    address: gameAddress,
    quoteSymbol: "GME",
    quoteAddress:
      addressEnv(env.VITE_GME_ADDRESS) ||
      "0x1b0e319c6a659f002271b69db8a7df2f911c153e",
    poolAddress,
    dividendDistributorAddress: addressEnv(env.VITE_DIVIDEND_DISTRIBUTOR_ADDRESS),
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
    originPostUrl:
      env.VITE_ORIGIN_POST_URL ||
      "https://x.com/gamestop/status/1405605194029801473?s=20",
  },
  economics: {
    totalSupply: numberEnv(env.VITE_TOTAL_SUPPLY, 1_000_000_000),
    buyTaxBps: numberEnv(env.VITE_BUY_TAX_BPS, 300),
    sellTaxBps: numberEnv(env.VITE_SELL_TAX_BPS, 300),
    minimumEligibleBalance: numberEnv(
      env.VITE_MIN_ELIGIBLE_GAMECOIN ?? env.VITE_MIN_ELIGIBLE_GAME,
      10_000,
    ),
    rewardAllocationBps: numberEnv(env.VITE_REWARD_ALLOCATION_BPS, 10_000),
    marketingBps: numberEnv(env.VITE_MARKETING_BPS, 0),
    deflationBps: numberEnv(env.VITE_DEFLATION_BPS, 0),
    liquidityBps: numberEnv(env.VITE_LP_BPS, 0),
    commissionBps: numberEnv(env.VITE_COMMISSION_BPS, 0),
  },
  media: {
    originCampaign:
      env.VITE_ORIGIN_CAMPAIGN_IMAGE ||
      "/assets/gamecoin name and logo on a skyscraper epic.png",
  },
  socials: {
    x: env.VITE_X_URL || "",
    telegram: env.VITE_TELEGRAM_URL || "",
    discord: env.VITE_DISCORD_URL || "",
  },
};

export const hasLiveDataConfig = Boolean(
  projectConfig.token.address && projectConfig.token.poolAddress,
);

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
