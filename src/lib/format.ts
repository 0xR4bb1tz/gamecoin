export function formatCompact(value: number | null, prefix = "", suffix = ""): string {
  if (value === null) return "Syncing";
  return `${prefix}${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)}${suffix}`;
}

export function formatDecimal(
  value: number | null,
  options: Intl.NumberFormatOptions = {},
): string {
  if (value === null) return "Syncing";
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function shortAddress(address: string, edge = 4): string {
  if (!address) return "Syncing";
  return `${address.slice(0, edge + 2)}...${address.slice(-edge)}`;
}

export function relativeTime(timestamp: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
