const {chain, Moralis} = require('../../../config/moralis');

const getNfts = async (req, res) => {
  const address = req.params.address;

  if(!address) return res.status(200).json({ message: 'Invaild wallet address' });

    // Get the nfts
  const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain
  })

  // Format the output to return name, amount and metadata
  const nfts = nftsBalances.result.map((nft) => {
    return ({
      contract_address: nft.result.tokenAddress._value,
      contract_name: nft.result.name,
      tokenId: nft.result.tokenId,
      metadata: nft.result.metadata,
    })
  })
  
  return res.status(200).json({ nfts });
}

module.exports = {
  getNfts
};

