import { createContext } from 'react';

const NftContext = createContext({
	nfts: null,
	collections: null,
	getNfts: (address) => {},
});

export default NftContext;
