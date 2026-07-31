import { useState } from "react";
import { bpsToPercent, isLive, projectConfig } from "../config/project";

const questions = [
  {
    question: "What is GameCoin?",
    answer:
      "GameCoin is a planned token on Robinhood Chain designed to trade directly against tokenized GME. Its configured reward allocation is intended to deliver GME rewards to eligible GAME holders.",
  },
  {
    question: "What is tokenized GME?",
    answer:
      "Tokenized GME is an onchain tokenized-stock product. It is not the same as owning directly registered GameStop shares, and availability may depend on jurisdiction and provider restrictions.",
  },
  {
    question: "How do GME rewards work?",
    answer:
      "Flap’s standard V6 tax-token system collects the configured token tax. After protocol handling, the allocatable reward share is converted into GME and processed by the standard dividend distributor.",
  },
  {
    question: "Is staking required?",
    answer:
      "No staking is planned. Eligibility is based on holding the configured minimum GAME balance, subject to the final launch settings and Flap contract behavior.",
  },
  {
    question: "What balance is required to qualify?",
    answer: `${projectConfig.economics.minimumEligibleBalance.toLocaleString()} GAME is the ${
      isLive ? "configured" : "tentative"
    } minimum eligible balance.`,
  },
  {
    question: "What are the buy and sell taxes?",
    answer: `The ${isLive ? "configured" : "tentative"} buy tax is ${bpsToPercent(
      projectConfig.economics.buyTaxBps,
    )}, and the ${isLive ? "configured" : "tentative"} sell tax is ${bpsToPercent(
      projectConfig.economics.sellTaxBps,
    )}. These values may change before launch.`,
  },
  {
    question: "How frequently are rewards paid?",
    answer:
      "The Flap contracts may process dividends automatically in batches, with manual claiming supported. Timing depends on trading activity, thresholds, gas conditions, and contract processing; no exact payout schedule is promised.",
  },
  {
    question: "Where can GAME be traded?",
    answer: isLive
      ? "GAME is configured to trade on Flap against tokenized GME. Always verify the contract address before trading."
      : "GAME is planned to launch on Flap against tokenized GME. The official trading link will activate here after deployment.",
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
          <span className="section-index">05 / HELP MENU</span>
          <h2>Player guide</h2>
        </div>
        <p>Straight answers about the planned launch, reward system, and risks.</p>
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
                  <i aria-hidden="true">{expanded ? "−" : "+"}</i>
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
