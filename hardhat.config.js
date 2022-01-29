// The entirety of your Hardhat setup (i.e. your config, plugins, and custom tasks) is contained in this file.

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: "https://ropsten.infura.io/v3/2ed1732ac4de4d9cb810eb7f35f5405f",
      accounts: [
        `0x62305138ba27a4e62b69b21d4c5446770a830849f7f9fcf189168ffb8c534392`,
      ],
    },
  },
};
