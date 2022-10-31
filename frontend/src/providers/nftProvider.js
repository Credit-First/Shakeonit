import { useState } from 'react';
import NftContext from '../context/nftContext';
import { getNfts } from '../store/apis';

const defaultState = {
	nfts: [],
	collections: [],
};

const getGenericImageUrl = (_url) => {
	_url = _url.replace('ipfs://', 'https://ipfs.io/ipfs/')
	if(!_url.includes('/')) _url = 'https://ipfs.io/ipfs/' + _url;
	return _url
}

const NftProvider = (props) => {
	const [state, setState] = useState(defaultState);

	const getNftsHandler = (chainId, address) => {
		getNfts(chainId, address)
			.then((res) => {
				let nfts = [];
				let collections = [];
				let exist_flag = false;
				for (let i = 0; i < res.nfts.length; i++) {
					exist_flag = false;
					const nft = res.nfts[i];
					const collection = {
						address: nft.contract_address,
						name: nft.contract_name,
						image: nft.metadata && getGenericImageUrl(nft.metadata.image || nft.metadata.animation_url),
						balance: 1
					};
					
					if( nft.metadata && !!(nft.metadata.image || nft.metadata.animation_url)) {
						nfts.push( {
							contract_address: nft.contract_address,
							contract_name: nft.contract_name,
							tokenId: nft.tokenId || 0,
							name: nft.metadata.name || 'Unknown',
							image: getGenericImageUrl(nft.metadata.image || nft.metadata.animation_url)
						})
					}

					for (let i = 0; i < collections.length; i++) {
						const _collection = collections[i];
						if(_collection.address === collection.address) {
							exist_flag = true;
							_collection.balance++;
							break;
						}
					}
					if(!exist_flag) {
						collections.push(collection);
					}
				}
				
				setState({ nfts, collections });
			})
			.catch((err) => {
				setState({ nfts: [], collections: [] });
			});
	};

	let nftContext = {
		nfts: state.nfts,
		collections: state.collections,
		getNfts: getNftsHandler,
	};

	return (
		<NftContext.Provider value={nftContext}>
			{props.children}
		</NftContext.Provider>
	);
};

export default NftProvider;
