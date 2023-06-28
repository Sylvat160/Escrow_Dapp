require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',
  networks: {
    // goerli: {
    //   url: GOERLI_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 5
    // },
    // sepolia : {},
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // accounts: Thanks to hardhat
      chainId: 31337,
    },
  },
}
