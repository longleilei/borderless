const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "outside unfold dish cinnamon already under nerve blue mouse donkey heart parent"; 

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     
     port: 8545,            
     network_id: "*",       
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/842960bcbfd3463fa157976d9e08f483`),
      network_id: 4,   
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
      },
  },

  // mocha: {
  //   // timeout: 100000
  // },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },


  db: {
    enabled: false
  }
};
