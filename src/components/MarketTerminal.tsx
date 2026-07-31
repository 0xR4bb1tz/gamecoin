import type { DataState } from "../types/data";
import { formatCompact, formatDecimal } from "../lib/format";
import { Icon } from "./Icons";
import { StatePanel } from "./StatePanel";

interface MarketTerminalProps {
  state: DataState;
}

const labels = [
  ["GAME / GME", "priceGme"],
  ["GAME / USD", "priceUsd"],
  ["Market cap", "marketCapUsd"],
  ["Liquidity", "liquidityUsd"],
  ["24h volume", "volume24hUsd"],
  ["Holders", "holders"],
  ["Eligible earners", "eligibleHolders"],
] as const;

export function MarketTerminal({ state }: MarketTerminalProps) {
  const market = state.status === "ready" ? state.data.market : null;

  const format = (key: (typeof labels)[number][1]) => {
    const value = market?.[key] ?? null;
    if (key === "priceGme") {
      return value === null
        ? "Pending"
        : `${formatDecimal(value, { maximumSignificantDigits: 6 })} GME`;
    }
    if (key === "priceUsd") {
      return value === null
        ? "Pending"
        : formatDecimal(value, { style: "currency", currency: "USD", maximumSignificantDigits: 6 });
    }
    if (key === "holders" || key === "eligibleHolders") {
      return formatDecimal(value, { maximumFractionDigits: 0 });
    }
    return formatCompact(value, "$");
  };

  return (
    <section className="section-block" id="terminal">
      <div className="section-heading">
        <div>
          <span className="section-index">02 / MARKET TERMINAL</span>
          <h2>Live game board</h2>
        </div>
        <p>Public market signals, refreshed through a shared cache without fabricated fallback figures.</p>
      </div>

      <div className="terminal-shell hud-corners">
        <div className="terminal-topline">
          <span><i /> GAME / GME</span>
          <span>{market ? `SYNC ${new Date(market.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "AWAITING ROUND"}</span>
        </div>
        <div className="market-grid">
          {labels.map(([label, key]) => (
            <article className="market-stat" key={key}>
              <span>{label}</span>
              <strong>{format(key)}</strong>
              <small>{market ? "ONCHAIN / PUBLIC DATA" : "AVAILABLE AFTER LAUNCH"}</small>
            </article>
          ))}
        </div>

        <div className="chart-frame">
          <div className="chart-label">
            <span><Icon name="chart" size={16} /> PRICE HISTORY</span>
            <span>GAME / GME</span>
          </div>
          {state.status === "ready" && market?.priceGme !== null ? (
            <div className="chart-ready" role="img" aria-label="Price chart placeholder awaiting historical data adapter">
              <svg viewBox="0 0 900 230" preserveAspectRatio="none" aria-hidden="true">
                <path className="chart-grid-line" d="M0 46H900M0 92H900M0 138H900M0 184H900" />
                <path className="chart-area" d="M0 190 70 178 130 182 200 150 260 160 330 119 390 132 460 88 530 101 610 62 680 76 750 39 820 52 900 24V230H0Z" />
                <path className="chart-line" d="M0 190 70 178 130 182 200 150 260 160 330 119 390 132 460 88 530 101 610 62 680 76 750 39 820 52 900 24" />
              </svg>
              <span>Historical candles connect when the final pool data source is confirmed.</span>
            </div>
          ) : (
            <StatePanel
              kind={state.status === "loading" ? "loading" : state.status === "error" ? "error" : state.status === "empty" ? "empty" : "prelaunch"}
              message={state.status === "error" ? state.error : undefined}
            />
          )}
        </div>
      </div>
    </section>
  );
}
