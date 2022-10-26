const {Moralis, EvmChain, supportedChainList} = require('../../config/moralis');

const getTokens = async (req, res) => {
  const address = req.params.address;
  const chainId = req.params.chainId;

  if(!address) return res.status(200).json({ message: 'Invaild wallet address' });
  if(!chainId) return res.status(200).json({ message: 'Invaild wallet chainId' });

  try{
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

module.exports = {
  getTokens
};

