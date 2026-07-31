import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Icon } from "./components/Icons";
import { MarketTerminal } from "./components/MarketTerminal";
import { Nav } from "./components/Nav";
import { RewardsVault } from "./components/RewardsVault";
import { StatusStrip } from "./components/StatusStrip";
import { TradeFeed } from "./components/TradeFeed";
import {
  bpsToPercent,
  explorerTokenUrl,
  isLive,
  projectConfig,
} from "./config/project";
import { useLiveData } from "./hooks/useLiveData";

function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <a
      className={`button button-${variant} ${href ? "" : "is-disabled"}`}
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      aria-disabled={!href}
    >
      {children}
    </a>
  );
}

function Hero() {
  const verifyUrl = projectConfig.token.address
    ? explorerTokenUrl(projectConfig.token.address)
    : "";

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-badges">
          <span><i /> {isLive ? "LIVE ROUND" : "PRELAUNCH ROUND"}</span>
          <span>{projectConfig.network.name}</span>
          <span>POWERED BY {projectConfig.launch.platform.toUpperCase()}</span>
        </div>
        <p className="hero-kicker">PLAYER-OWNED MARKET ENERGY / ROUND 00</p>
        <h1>
          PLAY THE MARKET.
          <span>EARN GME.</span>
        </h1>
        <p className="hero-lead">
          GameCoin is the stock-powered game coin planned for Robinhood Chain. GAME will trade
          directly against tokenized GME, with configured token-tax revenue routing GME rewards
          to eligible holders—without staking.
        </p>
        <div className="hero-actions">
          <ActionLink href={projectConfig.launch.flapUrl}>
            {isLive ? "Trade on Flap" : "Flap launch pending"}
            <Icon name="arrow" />
          </ActionLink>
          <ActionLink href={projectConfig.launch.dexScreenerUrl} variant="secondary">
            View chart
            <Icon name="chart" />
          </ActionLink>
          <ActionLink href={verifyUrl} variant="ghost">
            Verify contract
            <Icon name="shield" />
          </ActionLink>
        </div>
        <div className="hero-pair">
          <div>
            <span>TRADING PAIR</span>
            <strong>GAME / GME</strong>
          </div>
          <div>
            <span>REWARD ASSET</span>
            <strong>TOKENIZED GME</strong>
          </div>
          <div>
            <span>STAKING</span>
            <strong>NOT REQUIRED</strong>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-label="GameCoin prelaunch status">
        <div className="score-label">
          <span>GAME STATUS</span>
          <strong>{isLive ? "ONLINE" : "READY?"}</strong>
        </div>
        <div className="coin-stage">
          <i className="scan-ring ring-one" />
          <i className="scan-ring ring-two" />
          <i className="scan-ring ring-three" />
          <img src="/gamecoin-logo-placeholder.svg" alt="Temporary GameCoin logo placeholder" />
          <span className="coin-shadow" />
        </div>
        <div className="visual-readout">
          <span>CHAIN <strong>4663</strong></span>
          <span>PAIR <strong>GAME/GME</strong></span>
          <span>MODE <strong>{isLive ? "LIVE" : "PRE"}</strong></span>
        </div>
      </div>
    </section>
  );
}

function Mechanics() {
  const steps = [
    ["ROUND 01", "Launch against GME", "GAME is planned to launch and trade directly against tokenized GME through Flap."],
    ["ROUND 02", "Trades create tax", `The planned buy and sell tax is ${bpsToPercent(projectConfig.economics.buyTaxBps)} per side.`],
    ["ROUND 03", "Rewards convert", "The allocatable reward share is converted into tokenized GME by Flap’s standard infrastructure."],
    ["ROUND 04", "Players receive", `Wallets holding at least ${projectConfig.economics.minimumEligibleBalance.toLocaleString()} GAME are planned to qualify without staking.`],
  ];

  return (
    <section className="section-block" id="mechanics">
      <div className="section-heading">
        <div>
          <span className="section-index">03 / GAME LOOP</span>
          <h2>Four rounds. One clean loop.</h2>
        </div>
        <p>
          The values shown below are {isLive ? "configured" : "planned"} and centralized for
          an easy prelaunch-to-live switch.
        </p>
      </div>
      <div className="mechanics-grid">
        {steps.map(([round, title, copy], index) => (
          <article className="mechanic-card hud-corners" key={round}>
            <div className="mechanic-top">
              <span>{round}</span>
              <strong>0{index + 1}</strong>
            </div>
            <Icon name={index === 0 ? "gamepad" : index === 1 ? "chart" : index === 2 ? "spark" : "wallet"} size={28} />
            <h3>{title}</h3>
            <p>{copy}</p>
            {!isLive && <small>PLANNED SETTING</small>}
          </article>
        ))}
      </div>

      <div className="identity-panel">
        <div className="identity-copy">
          <span className="section-index">GAMECOIN IDENTITY</span>
          <h2>The market is live.<br />Every holder is a player.</h2>
          <p>
            GameCoin turns market participation into a shared scoreboard: player-owned momentum,
            transparent onchain rules, and rewards denominated in the asset at the center of the
            culture—tokenized GME.
          </p>
          <p>
            Built for Robinhood Chain and planned for Flap, GAME is a community experiment—not an
            official product of GameStop, Robinhood, Flap, or the tokenized-GME issuer.
          </p>
        </div>
        <div className="identity-score">
          <div><span>PLAYER</span><strong>HOLDER</strong></div>
          <div><span>SCORE</span><strong>GAME</strong></div>
          <div><span>DROP</span><strong>GME</strong></div>
          <div><span>ARENA</span><strong>RHC</strong></div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const dataState = useLiveData();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <StatusStrip />
        <MarketTerminal state={dataState} />
        <RewardsVault state={dataState} />
        <Mechanics />
        <TradeFeed state={dataState} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
