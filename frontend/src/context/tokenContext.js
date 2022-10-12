import { createContext } from 'react';

const TokenContext = createContext({
	native: null,
	custom: null,
	getTokens: (address) => {},
});

export default TokenContext;
