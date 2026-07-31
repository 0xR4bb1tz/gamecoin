import { Icon } from "./Icons";

interface StatePanelProps {
  kind: "prelaunch" | "loading" | "empty" | "error";
  compact?: boolean;
  title?: string;
  message?: string;
}

export function StatePanel({ kind, compact = false, title, message }: StatePanelProps) {
  const defaults = {
    prelaunch: ["Round not started", "Live onchain data becomes available after GAME launches."],
    loading: ["Syncing terminal", "Reading the latest public market and reward data."],
    empty: ["No activity yet", "The contracts are live, but no qualifying activity is available."],
    error: ["Signal interrupted", "Public data is temporarily unavailable. Onchain contracts remain unaffected."],
  };
  const [defaultTitle, defaultMessage] = defaults[kind];

  return (
    <div className={`state-panel state-${kind} ${compact ? "is-compact" : ""}`} role={kind === "error" ? "alert" : "status"}>
      <div className="state-icon">
        <Icon name={kind === "error" ? "shield" : kind === "loading" ? "spark" : "gamepad"} />
      </div>
      <div>
        <strong>{title ?? defaultTitle}</strong>
        <p>{message ?? defaultMessage}</p>
      </div>
      {kind === "loading" && <span className="loading-bars" aria-hidden="true"><i /><i /><i /></span>}
    </div>
  );
}
