import { useContext, useEffect, useCallback } from 'react';
import { useWeb3React } from "@web3-react/core";
import NftContext from '../../context/nftContext';
import TokenContext from '../../context/tokenContext';

const Layout = ({children}) => {
  const {account, chainId} = useWeb3React();
  const nftCtx = useContext(NftContext);
  const tokenCtx = useContext(TokenContext);

  const loadData = useCallback(() => {
      nftCtx.getNfts(chainId, account);
      tokenCtx.getTokens(chainId, account);
    }, [account, chainId])
  
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