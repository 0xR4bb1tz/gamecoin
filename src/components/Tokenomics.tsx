import { bpsToPercent, projectConfig } from "../config/project";
import { formatCompact } from "../lib/format";

const allocation = [
  ["GME holder rewards", projectConfig.economics.rewardAllocationBps],
  ["Marketing / treasury", projectConfig.economics.marketingBps],
  ["Token burns", projectConfig.economics.deflationBps],
  ["Additional liquidity", projectConfig.economics.liquidityBps],
  ["Creator commission", projectConfig.economics.commissionBps],
] as const;

const technical = [
  ["dividendBps", projectConfig.economics.rewardAllocationBps.toLocaleString()],
  ["marketingBps", projectConfig.economics.marketingBps.toLocaleString()],
  ["deflationBps", projectConfig.economics.deflationBps.toLocaleString()],
  ["lpBps", projectConfig.economics.liquidityBps.toLocaleString()],
  ["commissionBps", projectConfig.economics.commissionBps.toLocaleString()],
  ["dividendToken", "GME"],
  ["quoteToken", "GME"],
] as const;

export function Tokenomics() {
  return (
    <section className="section-block tokenomics-section" id="tokenomics">
      <div className="section-heading">
        <div>
          <span className="section-index">04 / TOKENOMICS</span>
          <h2>One tax destination.</h2>
        </div>
        <p>
          GME is both the quote asset and reward asset. Collected fees route directly to Flap's
          dividend distributor without a reward-token swap or custom vault.
        </p>
      </div>

      <div className="tokenomics-layout">
        <div className="tokenomics-core hud-corners">
          <div className="tokenomics-stats">
            <article>
              <span>TOTAL SUPPLY</span>
              <strong>{formatCompact(projectConfig.economics.totalSupply, "", " GAME")}</strong>
              <small>{projectConfig.economics.totalSupply.toLocaleString()} GAME</small>
            </article>
            <article>
              <span>BUY TAX</span>
              <strong>{bpsToPercent(projectConfig.economics.buyTaxBps)}</strong>
            </article>
            <article>
              <span>SELL TAX</span>
              <strong>{bpsToPercent(projectConfig.economics.sellTaxBps)}</strong>
            </article>
            <article>
              <span>MINIMUM ELIGIBLE</span>
              <strong>{formatCompact(projectConfig.economics.minimumEligibleBalance, "", " GAME")}</strong>
            </article>
          </div>

          <div className="allocation-panel">
            <div className="allocation-head">
              <div>
                <span>FEE ALLOCATION</span>
                <strong>100% GME holder rewards</strong>
              </div>
              <strong>10,000 BPS</strong>
            </div>
            <div className="allocation-bar" aria-label="100 percent of allocatable trading tax goes to GME holder rewards">
              <span />
            </div>
            <div className="allocation-list">
              {allocation.map(([label, bps]) => (
                <article className={bps ? "is-active" : ""} key={label}>
                  <span>{label}</span>
                  <strong>{bpsToPercent(bps)}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="direct-path">
          <div className="direct-art">
            <img
              src="/assets/gme stock rocket with candlesticks under it.png"
              alt="Stylized GME rocket rising through market candlesticks"
            />
          </div>
          <div className="direct-copy">
            <span className="live-chip"><i /> DIRECT GME PATH</span>
            <h3>No swap layer.<br />No custom vault.</h3>
            <p>
              GAME trades settle against GME. The dividend share is already denominated in GME,
              so eligible fees can enter Flap's standard distributor directly.
            </p>
            <div className="direct-flow" aria-label="Direct reward path">
              <span>GAME / GME TRADE</span>
              <i>→</i>
              <span>GME TAX</span>
              <i>→</i>
              <span>HOLDERS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="technical-strip">
        {technical.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
