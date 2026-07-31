import { useState } from "react";
import {
  explorerAddressUrl,
  explorerTokenUrl,
  projectConfig,
} from "../config/project";
import { shortAddress } from "../lib/format";
import { Icon } from "./Icons";

interface ContractItem {
  label: string;
  address: string;
  token?: boolean;
}

export function StatusStrip() {
  const [copied, setCopied] = useState("");
  const items: ContractItem[] = [
    { label: "GAMECOIN contract", address: projectConfig.token.address, token: true },
    { label: "GME contract", address: projectConfig.token.quoteAddress, token: true },
    { label: "GAMECOIN / GME pool", address: projectConfig.token.poolAddress },
    { label: "GME dividend distributor", address: projectConfig.token.dividendDistributorAddress },
  ];

  const copy = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopied(address);
    window.setTimeout(() => setCopied(""), 1400);
  };

  return (
    <section className="contract-strip" aria-label="Contract status">
      {items.map((item) => (
        <article className="contract-item" key={item.label}>
          <span>{item.label}</span>
          <div>
            <strong className={item.address ? "" : "pending-value"}>
              {shortAddress(item.address)}
            </strong>
            {item.address && (
              <span className="contract-actions">
                <button type="button" onClick={() => void copy(item.address)} aria-label={`Copy ${item.label}`}>
                  <Icon name={copied === item.address ? "check" : "copy"} size={15} />
                </button>
                <a
                  href={item.token ? explorerTokenUrl(item.address) : explorerAddressUrl(item.address)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${item.label} in explorer`}
                >
                  <Icon name="external" size={15} />
                </a>
              </span>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
