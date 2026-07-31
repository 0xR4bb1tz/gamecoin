# GameCoin Tokenomics

## Network and supply

- Network: Robinhood Chain
- Launchpad: Flap
- Trading pair: `GAMECOIN / GME`
- Total supply: `1,000,000,000 GAMECOIN`

## Trading tax

- Buy tax: `3%`
- Sell tax: `3%`
- GME holder rewards: `100%` of allocatable trading tax
- Marketing / treasury: `0%`
- Token burns: `0%`
- Additional liquidity: `0%`
- Creator commission: `0%`

## Holder rewards

Eligible GAMECOIN holders receive GME proportionally according to their eligible GAMECOIN balance.

- Minimum eligible holding: `10,000 GAMECOIN`
- Quote token: `GME`
- Dividend token: `GME`
- Staking required: no

Because GME is both quote token and dividend token, collected GME fees can route directly into
Flap's standard dividend distributor. The design does not require a reward-token swap, conversion
contract, or custom rewards vault.

## Technical allocation

```text
dividendBps: 10000
marketingBps: 0
deflationBps: 0
lpBps: 0
commissionBps: 0
dividendToken: GME
quoteToken: GME
```

When mapping these values to a Flap SDK or contract call, verify the deployed interface's exact
field names. Some Flap interfaces use `mktBps` for the marketing allocation.
