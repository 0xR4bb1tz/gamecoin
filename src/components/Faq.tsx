import { useState } from "react";
import { bpsToPercent, projectConfig } from "../config/project";

const questions = [
  {
    question: "What is GameCoin?",
    answer:
      "GameCoin is an independent community token on Robinhood Chain. It takes its name and cultural starting point from GameStop's historical Game Coin promotion, then applies that idea to an onchain GAME/GME market and holder-reward loop.",
  },
  {
    question: "Is this an official GameStop token?",
    answer:
      "No. GameCoin is not created, sponsored, endorsed, or operated by GameStop. The 2021 GameStop post is historical inspiration only. GameStop's original Game Coin was a retail rewards promotion, not this crypto token.",
  },
  {
    question: "What is tokenized GME?",
    answer:
      "Tokenized GME is an onchain tokenized-stock product. It is not the same as owning directly registered GameStop shares, and availability may depend on jurisdiction and provider restrictions.",
  },
  {
    question: "How do GME rewards work?",
    answer:
      "Flap's standard V6 tax-token system collects the configured token tax. After protocol handling, the allocatable reward share is converted into tokenized GME and processed by the standard dividend distributor.",
  },
  {
    question: "Is staking required?",
    answer:
      "No staking is required. Eligibility is based on holding the configured minimum GAME balance, subject to the deployed Flap contract behavior.",
  },
  {
    question: "What balance is required to qualify?",
    answer: `${projectConfig.economics.minimumEligibleBalance.toLocaleString()} GAME is the configured minimum eligible balance.`,
  },
  {
    question: "What are the buy and sell taxes?",
    answer: `The configured buy tax is ${bpsToPercent(
      projectConfig.economics.buyTaxBps,
    )}, and the configured sell tax is ${bpsToPercent(
      projectConfig.economics.sellTaxBps,
    )}. Verify the deployed contract before trading.`,
  },
  {
    question: "How frequently are rewards paid?",
    answer:
      "Flap can process dividends automatically in batches, while manual claiming can also be supported. Timing depends on trading activity, thresholds, gas conditions, and contract processing; no exact payout schedule is promised.",
  },
  {
    question: "Where can GAME be traded?",
    answer:
      "GAME trades on Flap against tokenized GME. Always enter through an official link and verify the GAME contract address before trading.",
  },
  {
    question: "What are the risks?",
    answer:
      "GAME is experimental. Crypto and tokenized assets can be highly volatile, illiquid, restricted, or lose all value. Smart-contract, market, provider, and regulatory risks apply. Rewards are variable and never guaranteed.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-block" id="faq">
      <div className="section-heading">
        <div>
          <span className="section-index">07 / HELP MENU</span>
          <h2>Player guide</h2>
        </div>
        <p>Straight answers about the origin, live market, reward system, and risks.</p>
      </div>
      <div className="faq-list">
        {questions.map((item, index) => {
          const expanded = open === index;
          return (
            <article className={expanded ? "faq-item is-open" : "faq-item"} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                  <i aria-hidden="true">{expanded ? "-" : "+"}</i>
                </button>
              </h3>
              <div className="faq-answer" hidden={!expanded}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
