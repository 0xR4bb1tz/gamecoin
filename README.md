# GameCoin Website

Production-ready live website for GameCoin, a GAMECOIN/GME token launched through Flap on Robinhood Chain.

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

The canonical fee distribution and deployed-parameter checklist are documented in
`docs/TOKENOMICS.md`.

## Connecting production data

1. Confirm the final Flap token settings.
2. Add the deployed GAMECOIN, GAMECOIN/GME pool, and dividend distributor addresses.
3. Add the final Flap, DexScreener, GMGN, and social URLs.
4. Set `VITE_SITE_URL` to the final HTTPS origin so Discord and X receive an absolute image URL.
5. Confirm buy tax, sell tax, reward allocation, and minimum eligible balance.
6. Connect the production backend/indexer to the typed `/api/live` response.
7. Run all quality checks.
8. Verify every external link against the deployed contracts before publishing.

The public interface is already presented in its final live state. Missing backend values use
explicit syncing states and never fabricate market, reward, trade, or holder data.

## Required post-deployment checklist

- [ ] GAMECOIN contract address
- [ ] GAMECOIN/GME pool address
- [ ] Flap dividend distributor address
- [ ] Final Flap token page
- [ ] Final DexScreener direct pair URL
- [ ] Final GMGN Robinhood token URL
- [ ] Official X URL
- [ ] Official Telegram URL
- [ ] Official Discord URL
- [ ] Confirmed GAMECOIN token decimals
- [ ] Confirmed GME token decimals
- [ ] Confirmed buy-tax basis points
- [ ] Confirmed sell-tax basis points
- [ ] Confirmed minimum eligible GAMECOIN balance
- [ ] Confirmed post-protocol reward allocation
- [ ] Flap V6 token ABI
- [ ] Dividend distributor ABI
- [ ] Tax processor ABI
- [ ] Pool ABI or verified indexer event format
- [ ] Final production domain for metadata, `robots.txt`, and `sitemap.xml`
- [ ] Final production site URL

## Brand assets

The supplied production logo is stored at `public/gamecoin.png`. The favicon and `1200x630`
Open Graph image are generated from it:

```text
public/favicon.ico
public/gamecoin-og.png
```

Regenerate those derivatives after replacing the source logo.

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
