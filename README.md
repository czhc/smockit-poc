# smockit-poc

Validating how to properly mock `receive()`, `fallback()` and `call()` behaviors of a given Contract (e.g. _TipJar_) for unit-testing a dependent contract (e.g. _Greeter_)

See proof in `test/Greeter.test.js`

## Setup and Validate

1. Clone this repo
2. `npx hardhat compile && npx hardhat test`.

The test _does not set greeting if TipJar fails to update_ fails because _TipJar.receive()_ is not successfully stubbed.


### Links

* ISSUE: https://github.com/ethereum-optimism/optimism/issues/1245
* PR: https://github.com/ethereum-optimism/optimism/pull/1246

