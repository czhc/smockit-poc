# smockit-poc

Validating how to properly mock `receive()`, `fallback()` and `call()` behaviors of a given Contract (e.g. `TipJar`) for unit-testing a dependent contract (e.g. `Greeter`)

See proof in `test/Greeter.test.js`

## Setup and Validate

1. Clone this repo
2. `npx hardhat compile && npx hardhat test`.

The test `"does not set greeting if TipJar fails to update"` fails because `TipJar.receive()` is not successfully stubbed to return a `(false)` response. 


### Links

* ISSUE: https://github.com/ethereum-optimism/optimism/issues/1245
* PR: https://github.com/ethereum-optimism/optimism/pull/1246

