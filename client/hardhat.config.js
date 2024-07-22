require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Update with your Ganache RPC server endpoint
      chainId: 1337, // Ganache usually uses chain ID 1337, but verify this in your Ganache settings
    },
  },
};
