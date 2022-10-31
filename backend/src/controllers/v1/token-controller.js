const axios = require('axios');
const { Moralis, EvmChain, supportedChainList } = require('../../config/moralis');

const getTokens = async (req, res) => {
  const address = req.params.address;
  const chainId = req.params.chainId;

  if (!address) return res.status(200).json({ message: 'Invaild wallet address' });
  if (!chainId) return res.status(200).json({ message: 'Invaild wallet chainId' });

  try {
    const chain = EvmChain[supportedChainList[chainId]];
    const native = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain
    });
    const custom = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain
    });

    return res.status(200).json({
      native,
      custom
    });
  } catch (error) {
    return res.status(200).json({ message: 'error fetch apis' });
  }
}

const tokenList = async (req, res) => {
  const result = await axios.get('https://tokens.coingecko.com/uniswap/all.json')
  const json = result.data.tokens
  return res.status(200).json(json)
}

const rateList = async (req, res) => {
  const result = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
  const json = result.data
  return res.status(200).json(json)
}

const tokenPathList = async (req, res) => {
  const result = await axios.get('https://tokens.coingecko.com/uniswap/all.json')
  const pathList = result.data.tokens.map(item => {
    return {
      [item.symbol]: {
        address: item.address, 
        pathToEth: [
          item.address,
          '0xdac17f958d2ee523a2206206994597c13d831ec7',
          '0x7af963cf6d228e564e2a0aa0ddbf06210b38615d'
        ]
      }
    }
  })

  return res.status(200).json(pathList)
}

module.exports = {
  getTokens,
  tokenList,
  rateList,
  tokenPathList
};

