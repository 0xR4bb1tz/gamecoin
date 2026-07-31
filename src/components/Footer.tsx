import { explorerTokenUrl, projectConfig } from "../config/project";
import { Icon } from "./Icons";

export function Footer() {
  const links = [
    ["Flap", projectConfig.launch.flapUrl],
    ["Contract", projectConfig.token.address ? explorerTokenUrl(projectConfig.token.address) : ""],
    ["DexScreener", projectConfig.launch.dexScreenerUrl],
    ["GMGN", projectConfig.launch.gmgnUrl],
    ["X", projectConfig.socials.x],
    ["Telegram", projectConfig.socials.telegram],
    ["Discord", projectConfig.socials.discord],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="brand-lockup footer-brand" href="#top">
          <img src="/gamecoin-logo-placeholder.svg" alt="" />
          <span>
            <strong>GAMECOIN</strong>
            <small>PLAY THE MARKET. EARN GME.</small>
          </span>
        </a>
        <p>
          An experimental GAME/GME token concept planned for Robinhood Chain. No staking.
          No guaranteed rewards. Verify every contract.
        </p>
        <div className="footer-links">
          {links.length ? (
            links.map(([label, href]) => (
              <a href={href} target="_blank" rel="noreferrer" key={label}>
                {label}
                <Icon name="external" size={13} />
              </a>
            ))
          ) : (
            <span>Official links pending launch</span>
          )}
        </div>
      </div>
      <div className="risk-disclosure">
        <strong>RISK NOTICE</strong>
        <p>
          GAME is an experimental crypto token. Tokenized GME is an onchain tokenized-stock
          product and is not the same as direct registration as a GameStop shareholder.
          Availability and eligibility may depend on jurisdiction and provider restrictions.
          Crypto and tokenized assets involve substantial risk, and rewards are variable and not
          guaranteed. GameCoin is not officially affiliated with or endorsed by GameStop,
          Robinhood, Flap, or the GME token issuer.
        </p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GameCoin</span>
        <span>Robinhood Chain / Chain ID {projectConfig.network.chainId}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
