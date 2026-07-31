import { useEffect, useState } from "react";
import { projectConfig } from "../config/project";
import { Icon } from "./Icons";

const links = [
  ["Terminal", "#terminal"],
  ["Rewards", "#rewards"],
  ["Game loop", "#mechanics"],
  ["FAQ", "#faq"],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="GameCoin home">
        <img src="/gamecoin-logo-placeholder.svg" alt="" />
        <span>
          <strong>GAMECOIN</strong>
          <small>PLAYER 01 / {projectConfig.mode.toUpperCase()}</small>
        </span>
      </a>

      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <span className="network-indicator">
          <i />
          {projectConfig.network.name}
        </span>
        <a
          className={projectConfig.launch.flapUrl ? "button button-small" : "button button-small is-disabled"}
          href={projectConfig.launch.flapUrl || undefined}
          aria-disabled={!projectConfig.launch.flapUrl}
        >
          Trade
          <Icon name="arrow" size={16} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>
    </header>
  );
}
