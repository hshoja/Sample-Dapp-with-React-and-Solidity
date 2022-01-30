# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Ropsten network

- register on infra a new project and allow wallet address
- Create a new wallet on meta mask and connect it to ropsten network
- get some facuet from website
- delopy the contract
  ```
  npx hardhat run scripts/deploy.js --network ropsten
  ```
- check web and see on etherscan the wallet and contract addresses

# Create a test token on Ropsten

- write solidity and compile it with hardhat
- add to deploy and deploy to ropsten
- add functions in UI
- import token address to your wallet
- transfer and check in etherscan and wallets
