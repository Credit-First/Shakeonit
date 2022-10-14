const Moralis = require('moralis').default
const { EvmChain } = require("@moralisweb3/evm-utils")

// const chain = EvmChain.ETHEREUM;
const chain = EvmChain.ETHEREUM;
 
const supportedChainList = {
	'1': 'ETHEREUM',
	'3': 'ROPSTEN',
	'4': 'RINKEBY',
	'5': 'GOERLI',
	'42': 'KOVAN',
	'11155111': 'SEPOLIA',
	'137': 'POLYGON',
	'80001': 'MUMBAI',
	'56': 'BSC',
	'97': 'BSC_TESTNET',
	'43114': 'AVALANCHE',
	'43113': 'FUJI',
	'250': 'FANTOM',
	'25': 'CRONOS',
	'338': 'CRONOS_TESTNE'
}

const startMoralisServer = async () => {
	await Moralis.start({
		apiKey: process.env.MORALIS_API_KEY,
	})
}

module.exports = {
	startMoralisServer,
	chain,
	Moralis,
	supportedChainList,
	EvmChain
}