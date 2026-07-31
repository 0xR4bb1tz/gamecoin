import type { ReactNode } from "react";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Icon } from "./components/Icons";
import { MarketTerminal } from "./components/MarketTerminal";
import { Nav } from "./components/Nav";
import { OnchainProof } from "./components/OnchainProof";
import { RewardsVault } from "./components/RewardsVault";
import { StatusStrip } from "./components/StatusStrip";
import { Tokenomics } from "./components/Tokenomics";
import { TradeFeed } from "./components/TradeFeed";
import {
  bpsToPercent,
  explorerTokenUrl,
  projectConfig,
} from "./config/project";
import { useLiveData } from "./hooks/useLiveData";

function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
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
      <img
        className="hero-backdrop-art"
        src="/assets/backdrop banner.png"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-badges">
          <span><i /> LIVE ROUND</span>
          <span>{projectConfig.network.name}</span>
          <span>POWERED BY {projectConfig.launch.platform.toUpperCase()}</span>
        </div>
        <p className="hero-kicker">THE 2021 SIGNAL, REBUILT ONCHAIN / ROUND 00</p>
        <h1>
          PLAY THE MARKET.
          <span>EARN GME.</span>
        </h1>
        <p className="hero-lead">
          A community-built GAMECOIN/GME token inspired by GameStop's 2021 Game Coin post. GAMECOIN
          trades against tokenized GME, turning eligible trading-tax revenue into GME holder
          rewards without staking.
        </p>
        <div className="hero-actions">
          <ActionLink href={projectConfig.launch.flapUrl}>
            Trade on Flap
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
            <strong>GAMECOIN / GME</strong>
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

      <div className="hero-visual" aria-label="GameCoin live status">
        <div className="score-label">
          <span>GAMECOIN STATUS</span>
          <strong>ONLINE</strong>
        </div>
        <div className="coin-stage">
          <i className="scan-ring ring-one" />
          <i className="scan-ring ring-two" />
          <i className="scan-ring ring-three" />
          <img src="/gamecoin.png" alt="GameCoin controller coin" />
          <span className="coin-shadow" />
        </div>
        <div className="visual-readout">
          <span>CHAIN <strong>4663</strong></span>
          <span>PAIR <strong>GAMECOIN/GME</strong></span>
          <span>MODE <strong>LIVE</strong></span>
        </div>
      </div>
    </section>
  );
}

function OriginStory() {
  return (
    <section className="section-block origin-section" id="origin">
      <div className="section-heading">
        <div>
          <span className="section-index">01 / ORIGIN SIGNAL</span>
          <h2>A name the internet already remembers.</h2>
        </div>
        <p>
          The inspiration is historical. The token is new, independent, and built for a different
          onchain chapter.
        </p>
      </div>

      <div className="origin-grid">
        <article className="origin-story hud-corners">
          <img
            className="origin-proof-image"
            src="/assets/tweet proof side vertical banner.png"
            alt="Archived GameStop Game Coin promotional post"
          />
          <span className="origin-year">2021</span>
          <p className="origin-eyebrow">GAMESTOP / GAME COIN</p>
          <h3>The original signal.</h3>
          <p>
            In 2021, GameStop publicly promoted its Game Coin rewards concept. That post became
            part of the same internet-market era that turned players, traders, and online
            communities into a shared cultural force.
          </p>
          <a
            className="source-link"
            href={projectConfig.launch.originPostUrl}
            target="_blank"
            rel="noreferrer"
          >
            View the source post
            <Icon name="external" size={15} />
          </a>
        </article>

        <div className="origin-bridge" aria-hidden="true">
          <span>THEN</span>
          <i />
          <strong>PLAYER ONE</strong>
          <i />
          <span>NOW</span>
        </div>

        <article className="origin-story origin-story-now hud-corners">
          <span className="origin-year">GAMECOIN</span>
          <p className="origin-eyebrow">ROBINHOOD CHAIN / GAMECOIN-GME</p>
          <h3>The onchain continuation.</h3>
          <p>
            GameCoin follows the narrative formula with transparent contracts: launch through
            Flap, trade against tokenized GME, and route the configured dividend share directly
            to eligible GAMECOIN holders in GME.
          </p>
          <span className="independent-label">INDEPENDENT COMMUNITY PROJECT</span>
        </article>
      </div>

      <div className="origin-feature">
        <figure>
          <img src={projectConfig.media.originCampaign} alt="GameCoin city campaign artwork" />
        </figure>
        <div>
          <span>FROM A RETAIL REWARD TO AN ONCHAIN MARKET</span>
          <h3>Power to the players,<br />rebuilt for the chain.</h3>
          <p>
            The name began with GameStop's Game Coin promotion. This independent continuation
            carries that player-first idea into a transparent GAMECOIN/GME market on Robinhood
            Chain.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mechanics() {
  const steps = [
    ["ROUND 01", "Trade against GME", "GAMECOIN launches and trades directly against tokenized GME through Flap."],
    ["ROUND 02", "Trades create tax", `The configured buy and sell tax is ${bpsToPercent(projectConfig.economics.buyTaxBps)} per side.`],
    ["ROUND 03", "GME routes directly", "Because GME is both quote and dividend token, the reward share needs no token swap."],
    ["ROUND 04", "Players receive", "Eligible GAMECOIN holders receive GME through Flap's standard dividend distributor without staking."],
  ];

  return (
    <section className="section-block" id="mechanics">
      <div className="section-heading">
        <div>
          <span className="section-index">06 / GAMECOIN LOOP</span>
          <h2>Four rounds. One clean loop.</h2>
        </div>
        <p>
          The live launch parameters are centralized so the interface and backend always read
          from one configuration.
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
            <small>LIVE SYSTEM</small>
          </article>
        ))}
      </div>

      <div className="identity-panel">
        <div className="identity-copy">
          <span className="section-index">GAMECOIN IDENTITY</span>
          <h2>The market is live.<br />Every holder is a player.</h2>
          <p>
            The 2021 idea was a reward for players. This independent onchain version keeps the
            player-first energy and turns market participation into a transparent reward loop
            denominated in tokenized GME.
          </p>
          <p>
            Built for Robinhood Chain and launched through Flap, GAMECOIN is a community experiment - not
            an official product of GameStop, Robinhood, Flap, or the tokenized-GME issuer.
          </p>
        </div>
        <div className="identity-score">
          <div><span>PLAYER</span><strong>HOLDER</strong></div>
          <div><span>SCORE</span><strong>GAMECOIN</strong></div>
          <div><span>DROP</span><strong>GME</strong></div>
          <div><span>ARENA</span><strong>RHC</strong></div>
        </div>
      </div>

      <div className="ecosystem-stories">
        <article className="ecosystem-story ecosystem-story-wide">
          <div className="ecosystem-art-pair">
            <figure>
              <img src="/assets/robinhoodchaincoin banner.png" alt="Robinhood Chain artwork" />
            </figure>
            <figure className="is-round">
              <img src="/assets/vlad tenev banner.png" alt="Vlad Tenev editorial artwork" />
            </figure>
          </div>
          <div className="ecosystem-copy">
            <span>2026 / THE ONCHAIN ARENA</span>
            <h3>Robinhood Chain opens the next round.</h3>
            <p>
              Under CEO Vlad Tenev, Robinhood launched its public mainnet in 2026, advancing an
              onchain market built around tokenized assets. GameCoin enters that new arena with
              GME at the center of both trading and holder rewards.
            </p>
          </div>
        </article>

        <article className="ecosystem-story">
          <figure className="is-round">
            <img src="/assets/flap reference banner flap logo against a backdrop.png" alt="Flap launch platform artwork" />
          </figure>
          <div className="ecosystem-copy">
            <span>LAUNCH INFRASTRUCTURE</span>
            <h3>Launched through Flap.</h3>
            <p>
              Flap provides the onchain token launch, GAMECOIN/GME market, trading-tax logic,
              and standard dividend distribution used by GameCoin.
            </p>
          </div>
        </article>

        <article className="ecosystem-story">
          <figure>
            <img src="/assets/roaring kitty i like the stock banner.png" alt="GameStop market-culture artwork" />
          </figure>
          <div className="ecosystem-copy">
            <span>THE COMMUNITY LINEAGE</span>
            <h3>Players became market participants.</h3>
            <p>
              GameCoin draws from the internet culture that made GameStop a shared signal for
              players, traders, and communities, while remaining an independent project.
            </p>
          </div>
        </article>
      </div>
      <p className="culture-disclaimer">
        Editorial and cultural references only. No person or company shown is affiliated with,
        sponsoring, or endorsing GameCoin.
      </p>
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
        <OriginStory />
        <StatusStrip />
        <MarketTerminal state={dataState} />
        <RewardsVault state={dataState} />
        <Tokenomics />
        <OnchainProof state={dataState} />
        <Mechanics />
        <TradeFeed state={dataState} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
