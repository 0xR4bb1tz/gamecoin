import { explorerTxUrl } from "../config/project";
import { formatDecimal, relativeTime, shortAddress } from "../lib/format";
import type { DataState } from "../types/data";
import { Icon } from "./Icons";
import { StatePanel } from "./StatePanel";

export function TradeFeed({ state }: { state: DataState }) {
  const trades = state.status === "ready" ? state.data.trades : [];

  return (
    <section className="section-block" id="trades">
      <div className="section-heading compact-heading">
        <div>
          <span className="section-index">07 / LIVE MATCH</span>
          <h2>Recent trades</h2>
        </div>
        <p>Verified GAME/GME activity, indexed from the live pool and linked to the explorer.</p>
      </div>

      <div className="trade-feed">
        <div className="trade-header">
          <span>Side</span>
          <span>GAME</span>
          <span>Value</span>
          <span>Player</span>
          <span>Time</span>
          <span />
        </div>
        {trades.length ? (
          trades.map((trade) => (
            <a className="trade-row" href={explorerTxUrl(trade.hash)} target="_blank" rel="noreferrer" key={trade.hash}>
              <span className={`trade-side is-${trade.side}`}>{trade.side}</span>
              <strong>{formatDecimal(trade.gameAmount, { maximumFractionDigits: 2 })}</strong>
              <span>
                {trade.valueGme !== null
                  ? `${formatDecimal(trade.valueGme, { maximumFractionDigits: 4 })} GME`
                  : trade.valueUsd !== null
                    ? formatDecimal(trade.valueUsd, { style: "currency", currency: "USD" })
                    : "Syncing"}
              </span>
              <span>{shortAddress(trade.wallet)}</span>
              <span>{relativeTime(trade.timestamp)}</span>
              <Icon name="external" size={15} />
            </a>
          ))
        ) : (
          <StatePanel
            kind={state.status === "loading" ? "loading" : state.status === "error" ? "error" : "empty"}
            compact
          />
        )}
      </div>
    </section>
  );
}
