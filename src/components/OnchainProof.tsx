import {
  explorerAddressUrl,
  explorerTokenUrl,
  projectConfig,
} from "../config/project";
import { formatCompact, shortAddress } from "../lib/format";
import type { DataState } from "../types/data";
import { Icon } from "./Icons";
import { StatePanel } from "./StatePanel";

const contracts = [
  {
    label: "GAME token",
    address: projectConfig.token.address,
    href: projectConfig.token.address
      ? explorerTokenUrl(projectConfig.token.address)
      : "",
  },
  {
    label: "GME quote / reward token",
    address: projectConfig.token.quoteAddress,
    href: explorerTokenUrl(projectConfig.token.quoteAddress),
  },
  {
    label: "GAME / GME pool",
    address: projectConfig.token.poolAddress,
    href: projectConfig.token.poolAddress
      ? explorerAddressUrl(projectConfig.token.poolAddress)
      : "",
  },
  {
    label: "Dividend distributor",
    address: projectConfig.token.dividendDistributorAddress,
    href: projectConfig.token.dividendDistributorAddress
      ? explorerAddressUrl(projectConfig.token.dividendDistributorAddress)
      : "",
  },
];

export function OnchainProof({ state }: { state: DataState }) {
  const holders = state.status === "ready" ? state.data.notableHolders : [];

  return (
    <section className="section-block proof-section" id="proof">
      <div className="section-heading">
        <div>
          <span className="section-index">05 / ONCHAIN PROOF</span>
          <h2>Verify the game.</h2>
        </div>
        <p>
          Contracts, reward recipients, and balances belong onchain. Every populated record links
          directly to the Robinhood Chain explorer.
        </p>
      </div>

      <div className="proof-layout">
        <div className="contract-board hud-corners">
          <div className="panel-title">
            <div>
              <span>VERIFIED CONTRACTS</span>
              <strong>GAME system addresses</strong>
            </div>
            <span className="status-text">CHAIN {projectConfig.network.chainId}</span>
          </div>
          <div className="proof-contracts">
            {contracts.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.address ? shortAddress(item.address, 8) : "SYNCING"}</strong>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Verify ${item.label}`}>
                    VERIFY <Icon name="external" size={13} />
                  </a>
                ) : (
                  <small>BACKEND CONNECTION</small>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="holder-board hud-corners">
          <div className="panel-title">
            <div>
              <span>NOTABLE PLAYERS</span>
              <strong>Holder reward board</strong>
            </div>
            <span className="status-text">{holders.length ? `${holders.length} VERIFIED` : "SYNCING"}</span>
          </div>
          {holders.length ? (
            <div className="holder-list">
              {holders.map((holder) => (
                <a
                  href={explorerAddressUrl(holder.address)}
                  target="_blank"
                  rel="noreferrer"
                  key={`${holder.label}-${holder.address}`}
                >
                  <span className="holder-rank">P{String(holders.indexOf(holder) + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{holder.label}</strong>
                    <small>{shortAddress(holder.address, 6)}</small>
                  </div>
                  <div>
                    <span>GAME BALANCE</span>
                    <strong>{formatCompact(holder.balanceGame, "", " GAME")}</strong>
                  </div>
                  <div>
                    <span>GME RECEIVED</span>
                    <strong>{formatCompact(holder.rewardsGme, "", " GME")}</strong>
                  </div>
                  <Icon name="external" size={14} />
                </a>
              ))}
            </div>
          ) : (
            <StatePanel
              kind={state.status === "loading" ? "loading" : state.status === "error" ? "error" : "empty"}
              compact
              title="Holder board syncing"
              message="Verified wallet highlights will appear from the live indexer. No wallets are hardcoded or fabricated."
            />
          )}
        </div>
      </div>
    </section>
  );
}
