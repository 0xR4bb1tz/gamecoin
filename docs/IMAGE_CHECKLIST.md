# GameCoin Image Checklist

The layout is complete without these files. Add them when final campaign artwork is ready and
set their public URLs in the matching environment variables.

## 1. Origin campaign artwork

- Environment variable: `VITE_ORIGIN_CAMPAIGN_IMAGE`
- Recommended filename: `public/media/gamecoin-origin.webp`
- Canvas: `1600x900` (16:9)
- Safe text area: left 45% should remain low-detail because website copy overlays that region
- Subject direction: coin/controller or 2021 internet-market visual language
- Avoid: GameStop trademarks, store logos, or anything implying official endorsement

## 2. GME reward-engine artwork

- Environment variable: `VITE_REWARD_CAMPAIGN_IMAGE`
- Recommended filename: `public/media/gamecoin-rewards.webp`
- Canvas: `1600x900` (16:9)
- Safe text area: left 45% should remain low-detail
- Subject direction: GAME flowing through an onchain system and emerging as GME rewards
- Avoid: fake dashboards, fake balances, or promised returns

## Existing production assets

- `public/gamecoin.png`: primary square logo
- `public/favicon.ico`: generated browser favicon
- `public/gamecoin-og.png`: `1200x630` Discord/X/Open Graph card

Use WebP for campaign artwork where possible and keep each file below 350 KB after export.
