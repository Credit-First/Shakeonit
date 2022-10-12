const {chain, Moralis} = require('../../config/moralis');

const getTokens = async (req, res) => {
  const address = req.params.address;

  if(!address) return res.status(200).json({ message: 'Invaild wallet address' });

  try{
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

