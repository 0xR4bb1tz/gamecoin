import { Icon } from "./Icons";

interface StatePanelProps {
  kind: "loading" | "empty" | "error";
  compact?: boolean;
  title?: string;
  message?: string;
}

export function StatePanel({ kind, compact = false, title, message }: StatePanelProps) {
  const defaults = {
    loading: ["Syncing terminal", "Reading the latest public market and reward data."],
    empty: ["Live data connection pending", "The interface is ready. Verified onchain data will populate through the public adapter."],
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
