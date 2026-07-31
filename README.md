# GameCoin Website

Production-ready prelaunch website for GameCoin, a planned GAME/GME token launch through Flap on Robinhood Chain.

## Local setup

```bash
npm install
npm run dev
```

The development server defaults to `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run deploy:dry
```

## Configuration

All editable project facts are centralized in:

```text
src/config/project.ts
```

Environment-specific values are documented in:

```text
.env.example
```

Copy `.env.example` to `.env.local` for local overrides. Do not commit `.env.local`.

## Switching from prelaunch to live

1. Confirm the final Flap token settings.
2. Add the deployed GAME, GAME/GME pool, and dividend distributor addresses.
3. Add the final Flap, DexScreener, GMGN, and social URLs.
4. Confirm buy tax, sell tax, reward allocation, and minimum eligible balance.
5. Change `VITE_GAMECOIN_MODE` from `prelaunch` to `live`.
6. Run all quality checks.
7. Verify every external link against the deployed contracts before publishing.

The page structure does not need to change. Prelaunch labels, disabled actions, and empty states automatically become live when valid configuration is supplied.

## Required post-deployment checklist

- [ ] GAME contract address
- [ ] GAME/GME pool address
- [ ] Flap dividend distributor address, branded publicly as the GME Rewards Vault
- [ ] Final Flap token page
- [ ] Final DexScreener direct pair URL
- [ ] Final GMGN Robinhood token URL
- [ ] Official X URL
- [ ] Official Telegram URL
- [ ] Official Discord URL
- [ ] Confirmed GAME token decimals
- [ ] Confirmed GME token decimals
- [ ] Confirmed buy-tax basis points
- [ ] Confirmed sell-tax basis points
- [ ] Confirmed minimum eligible GAME balance
- [ ] Confirmed post-protocol reward allocation
- [ ] Flap V6 token ABI
- [ ] Dividend distributor ABI
- [ ] Tax processor ABI
- [ ] Pool ABI or verified indexer event format
- [ ] Final production domain for metadata, `robots.txt`, and `sitemap.xml`
- [ ] Final GameCoin logo, favicon, and Open Graph image

## Temporary logo

The final logo was not present in the supplied attachment folder. The temporary asset is intentionally isolated at:

```text
public/gamecoin-logo-placeholder.svg
```

Replace that file with the final logo using the same filename, or update its references in `index.html`, `site.webmanifest`, and the React components. Replace `public/gamecoin-og-placeholder.svg` with a production `1200x630` PNG before public launch.

## Data architecture

The browser requests `/api/live` approximately every 25 seconds only in live mode. The Cloudflare Worker in `worker/index.ts` caches public provider responses for 20 seconds, preventing every visitor from independently polling DexScreener and Blockscout.

Current adapters provide:

- DexScreener pair-level market data
- Robinhood Blockscout holder count
- Honest empty states for reward payouts and trades until final Flap interfaces are supplied

See `docs/LIVE_DATA_ADAPTERS.md` for the expected integration fields.

## Deployment

The repository is prepared for Cloudflare Workers Static Assets:

```bash
npm run build
npx wrangler deploy
```

Do not deploy until the Cloudflare account/project and production domain are explicitly approved.

