// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // sample-script.js that will deploy your smart contract when executed
  // We get the contract to deploy
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();

  const ERCToken = await hre.ethers.getContractFactory("ERCToken");
  const ercToken = await ERCToken.deploy("ERC HAMID SHOJA", "EHSH");

  await greeter.deployed();
  // await token.deployed();
  await ercToken.deployed();

  console.log("Greeter deployed to:", greeter.address);
  // console.log("Token deployed to:", token.address);
  console.log("Token deployed to:", ercToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
