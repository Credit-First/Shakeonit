import { useContext, useEffect, useCallback } from 'react';
import { useWeb3React } from "@web3-react/core";
import NftContext from '../../context/nftContext';
import TokenContext from '../../context/tokenContext';

const Layout = ({children}) => {
  const {account} = useWeb3React();
  const nftCtx = useContext(NftContext);
  const tokenCtx = useContext(TokenContext);

  const loadData = useCallback(() => {
      nftCtx.getNfts(account);
      tokenCtx.getTokens(account);
    }, [account])
  
	useEffect(() => {
    account && loadData()
  }, [account, loadData]);
  
  
	return (
		<>
				{children}
		</>
	)
}

export default Layout;