require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider")
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider('afraid voyage coyote stumble can air language express shine sign route medal', `https://rpc-mumbai.maticvigil.com/v1/783462f964c047d701690efe64bfc23f9e1f927e`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4", 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
