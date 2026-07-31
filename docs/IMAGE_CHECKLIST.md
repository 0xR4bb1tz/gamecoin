# GameCoin Image Map

All currently required production image slots are filled.

## Active artwork

| Asset | Placement |
| --- | --- |
| `backdrop banner.png` | Hero atmospheric backdrop |
| `tweet proof side vertical banner.png` | 2021 Game Coin origin proof |
| `gamecoin name and logo on a skyscraper epic.png` | Origin campaign panel |
| `gme stock rocket with candlesticks under it.png` | Reward campaign and direct-GME tokenomics panel |
| `roaring kitty i like the stock banner.png` | Community-signal editorial card |
| `robinhoodchaincoin banner.png` | Robinhood Chain editorial card |
| `flap reference banner flap logo against a backdrop.png` | Flap infrastructure editorial card |
| `vlad tenev banner.png` | Onchain-markets editorial card |

The editorial strip includes an explicit no-affiliation/no-endorsement disclaimer.

## Existing brand assets

- `public/gamecoin.png`: primary square logo
- `public/favicon.ico`: generated browser favicon
- `public/gamecoin-og.png`: `1200x630` Discord/X/Open Graph card

## Optional future upgrades

No additional image is required. If desired, the two campaign panels can later be replaced with
dedicated `1600x900` WebP artwork through:

```env
VITE_ORIGIN_CAMPAIGN_IMAGE=
VITE_REWARD_CAMPAIGN_IMAGE=
```

Keep optional replacements below 350 KB each and leave the left 45% relatively low-detail because
the website overlays copy in that region.
