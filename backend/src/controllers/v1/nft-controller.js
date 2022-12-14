const {Moralis, EvmChain, supportedChainList} = require('../../config/moralis');

const getNfts = async (req, res) => {
  const address = req.params.address;
  const chainId = req.params.chainId;

  if(!address) return res.status(200).json({ message: 'Invaild wallet address' });

  try {
    const chain = EvmChain[supportedChainList[chainId]]
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
  } catch (error) {
    return res.status(200).json({ message: 'error fetch apis' });
  }
}

module.exports = {
  getNfts
};

