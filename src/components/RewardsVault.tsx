import { bpsToPercent, projectConfig } from "../config/project";
import { formatCompact, formatDecimal } from "../lib/format";
import type { DataState } from "../types/data";
import { Icon } from "./Icons";
import { StatePanel } from "./StatePanel";

interface RewardsVaultProps {
  state: DataState;
}

const flow = [
  ["01", "GAME trades", "Buys and sells occur against tokenized GME."],
  ["02", "Tax accrues", "The configured token tax is collected by Flap’s V6 infrastructure."],
  ["03", "Converted to GME", "The allocatable reward share is converted into tokenized GME."],
  ["04", "Players receive", "Eligible GAME holders receive rewards without staking."],
];

export function RewardsVault({ state }: RewardsVaultProps) {
  const rewards = state.status === "ready" ? state.data.rewards : null;

  return (
    <section className="section-block rewards-section" id="rewards">
      <div className="section-heading">
        <div>
          <span className="section-index">03 / REWARD DROP</span>
          <h2>GME Rewards Vault</h2>
        </div>
        <p>
          The public-facing scoreboard for Flap’s standard dividend distributor—not a separate
          custom custody or staking contract.
        </p>
      </div>

      <div className="rewards-layout">
        <div className="vault-display hud-corners">
          <div className="vault-orbit" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <img src="/gamecoin.png" alt="" />
          </div>
          <div className="vault-copy">
            <span className="live-chip"><i /> {rewards ? "VAULT ONLINE" : "VAULT PENDING"}</span>
            <h3>GME enters.<br />Players level up.</h3>
            <p>
              Planned allocation: <strong>{bpsToPercent(projectConfig.economics.rewardAllocationBps)}</strong> of
              allocatable post-protocol token-tax revenue is directed toward holder rewards.
            </p>
          </div>
        </div>

        <div className="reward-scoreboard">
          <article>
            <span>Total GME distributed</span>
            <strong>{formatCompact(rewards?.totalDistributedGme ?? null, "", " GME")}</strong>
          </article>
          <article>
            <span>Distributed value</span>
            <strong>{formatCompact(rewards?.totalDistributedUsd ?? null, "$")}</strong>
          </article>
          <article>
            <span>Awaiting distribution</span>
            <strong>{formatCompact(rewards?.awaitingDistributionGme ?? null, "", " GME")}</strong>
          </article>
          <article>
            <span>Eligible / active earners</span>
            <strong>{formatDecimal(rewards?.activeEarners ?? null, { maximumFractionDigits: 0 })}</strong>
          </article>
        </div>
      </div>

      <div className="reward-flow">
        {flow.map(([number, title, copy], index) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            {index < flow.length - 1 && <Icon name="arrow" />}
          </article>
        ))}
      </div>

      <div className="payout-panel">
        <div className="panel-title">
          <div>
            <span>RECENT PAYOUTS</span>
            <strong>Reward transaction log</strong>
          </div>
          <span className="status-text">{rewards?.payouts.length ? `${rewards.payouts.length} RECORDS` : "NO RECORDS"}</span>
        </div>
        {rewards?.payouts.length ? (
          <div className="payout-list">
            {rewards.payouts.map((payout) => (
              <a href={`https://robinhoodchain.blockscout.com/tx/${payout.hash}`} target="_blank" rel="noreferrer" key={payout.hash}>
                <span>{payout.recipient}</span>
                <strong>{formatDecimal(payout.amountGme, { maximumFractionDigits: 4 })} GME</strong>
                <Icon name="external" size={15} />
              </a>
            ))}
          </div>
        ) : (
          <StatePanel kind={state.status === "loading" ? "loading" : state.status === "error" ? "error" : state.status === "ready" ? "empty" : "prelaunch"} compact />
        )}
      </div>
    </section>
  );
}
