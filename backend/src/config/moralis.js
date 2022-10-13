const Moralis = require('moralis').default
const { EvmChain } = require("@moralisweb3/evm-utils")

// const chain = EvmChain.ETHEREUM;
const chain = EvmChain[process.env.MAIN_CHAIN || 'ETHEREUM'];
 
const startMoralisServer = async () => {
	await Moralis.start({
		apiKey: process.env.MORALIS_API_KEY,
	})
}

module.exports = {
	startMoralisServer,
	chain,
	Moralis,
}