import { useState } from 'react';
import TokenContext from '../context/tokenContext';
import { getTokens } from '../store/apis';

const defaultState = {
	native: {},
	custom: [],
};

const TokenProvider = (props) => {
	const [state, setState] = useState(defaultState);

	const getTokensHandler = (address) => {
		getTokens(address)
			.then((res) => {
				const native = res.native;
				const custom = res.custom;
				setState({ native, custom });
			})
			.catch((err) => {
				setState({ native: {}, custom: [] });
			});
	};

	let tokenContext = {
		native: state.native,
		custom: state.custom,
		getTokens: getTokensHandler,
	};

	return (
		<TokenContext.Provider value={tokenContext}>
			{props.children}
		</TokenContext.Provider>
	);
};

export default TokenProvider;
