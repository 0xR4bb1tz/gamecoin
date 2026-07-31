# Live Data Adapter Guide

Official protocol references:

- https://docs.flap.sh/flap
- https://docs.flap.sh/flap/developers/flap-tax-token/tax-token-v2

## Current public sources

The shared Worker endpoint is implemented in `worker/index.ts`.

### DexScreener

Used for pair-level values when a valid GAME/GME pool address exists:

- GAME price in GME (`priceNative`)
- GAME price in USD (`priceUsd`)
- Market capitalization or FDV
- Liquidity in USD
- 24-hour volume in USD

The final DexScreener Robinhood chain identifier must be verified after the pool is indexed. The provider adapter deliberately returns an unavailable state if the pair cannot be resolved.

### Robinhood Blockscout

Used for token holder count through the token counters endpoint:

```text
GET /api/v2/tokens/{GAME_ADDRESS}/counters
```

## Flap interfaces still required

No Flap ABI was present locally, so the site does not invent reward or trade data. Add verified interfaces for these fields after deployment.

### GAME token

Expected reads:

- `decimals() -> uint8`
- `totalSupply() -> uint256`
- `balanceOf(address) -> uint256`

### GME dividend distributor

Expected capabilities depend on Flap V6’s deployed distributor:

- Total GME distributed
- GME awaiting distribution
- Number of eligible or active earners
- Recent payout events
- Manual claim method, if exposed for UI use

Required event information:

- Recipient
- GME amount
- Transaction hash
- Block timestamp

### Tax processor

Verify:

- Buy tax
- Sell tax
- Post-protocol allocatable amount
- Reward allocation directed to the dividend distributor
- Conversion asset and route

The website must describe the reward allocation as a share of **allocatable post-protocol token-tax revenue**, never as 100% of gross trading taxes.

### GAME/GME pool

For a live trade feed, supply either a verified pool ABI or an indexed event schema containing:

- Buy or sell direction
- GAME amount
- GME amount

### Notable holder board

The `/api/live` response may include a `notableHolders` array:

```json
{
  "notableHolders": [
    {
      "label": "PLAYER LABEL",
      "address": "0x...",
      "balanceGame": 0,
      "rewardsGme": 0
    }
  ]
}
```

Only include wallets that the project can identify and verify publicly. Do not infer an identity
from a wallet without a reliable public source. The frontend renders an honest syncing state when
the array is empty.
- Wallet
- Transaction hash
- Block timestamp

All raw integer quantities must be formatted with the actual token decimals. Do not assume 18 decimals.

## Validation requirements

- Validate all provider responses before exposing them to the UI.
- Reject malformed EVM addresses.
- Use checksummed addresses for display once a checksum library is introduced.
- Cache public responses for 15–30 seconds.
- Preserve the last successful shared cache entry during brief upstream failures where appropriate.
- Never substitute generated values for missing provider data.
- Keep transactions read-only; no private keys or signing logic belong in this website.
