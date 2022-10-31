import * as React from 'react';
import { Dialog } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import { TypographySize20 } from "../Typography/TypographySize";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Config from '../../config/app';
import { Wallets } from '../../config/assets/constants/wallets';
import { walletconnect } from "../../config/assets/constants/connectors";
import { useEagerConnect } from '../../Hook/useEagerConnect';
import { useInactiveListener } from '../../Hook/useInactiveListener';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { URI_AVAILABLE, UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import clsx from 'clsx';

const WalletModal = () => {
    const [open, setOpen] = React.useState(false);
    const [alertClose, setAlertClose] = React.useState(true);
    const triedEager = useEagerConnect();
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const [isSelectingWallet, setIsSelectingWallet] = React.useState(true);
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();

    // ** Effects
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    // log the walletconnect URI
    React.useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useInactiveListener(!triedEager);

    const onConnectWallet = (item) => async () => {
        setActivatingConnector(item.connector);
        setIsSelectingWallet(false);
        sessionStorage.close = false;
        await activate(item.connector);
    };

    const onDeactiveWallet = () => {
        setIsSelectingWallet(true);
        sessionStorage.close = "true";
        deactivate();
        setOpen(false);
    };

    const retryConnect = async () => {
        const activating = Wallets.find(item => (item.connector === activatingConnector || item.connector === connector));
        if (window.ethereum) {
            await window.ethereum
                .request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${Config.netId.toString(16)}`,
                            chainName: "Ethereum Mainnet",
                            rpcUrls: [
                                Config.test_rpc_url
                            ],
                            nativeCurrency: {
                                name: "ETH",
                                symbol: "ETH",
                                decimals: 18,
                            },
                            blockExplorerUrls: [
                                Config.test_rpc_url
                            ],
                        },
                    ],
                })
                .then(() => {
                    alert("You have successfully changed to Binance Smart Main Network.");
                })
                    .catch((error) => {
                    alert(error.toString());
                });
        } else {
            alert('error')
        }
        onConnectWallet(activating);
        setError(null);
    };

    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "Install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };

    React.useEffect(() => {
        if (active) {
        } else {
            setIsSelectingWallet(true);
        }
        if(error) setAlertClose(false);
    }, [account, active, error])

    return (
        <>
            <div className="gradient pulse flex justify-center items-center" style={{ width: "100%", height: "100%" }} onClick={() => setOpen(true)} >
                <div className="bg-white gradient-child flex justify-center items-center" style={{ width: "100%", height: "100%" }}>
                    <a style={{ textAlign: "center" }} className="flex items-center connect-btn">
                        {active ? (
                                    <div>
                                            {account.substring(0, 8)} ... ${account.substring(account.length - 4)}
                                    </div>
                            ) : (
                                    <div>Connect Wallet</div>
                            )}
                    </a> 
                </div>
            </div>
            <Dialog
                onClose={() => setOpen(false)}
                open={open}
                maxWidth="xs"
                fullWidth
                className="relative"
            >
                <div className="absolute" style={{ top: "10px", right: "15px" }}><CloseIcon onClick={() => setOpen(false)} /></div>
                <div>
                    <div>
                        <div className="py-6">
                            <p className="flex justify-center wallet-lg">Connect Wallet</p>
                            <p className="flex justify-center wallet-md pt-2">To start using shakeoint</p>
                        </div>
                    </div>
                    {
                            (error || chainId == undefined) ? (
                                    <div id="alert-error" className={clsx('mx-5 px-4 bg-red-100 rounded-lg dark:bg-red-200', alertClose ? 'hidden' : '')} role="alert">
                                            <div className="pt-2 text-center text-sm text-red-700 dark:text-red-800">
                                                    {getErrorMessage(error)}
                                            </div>
                                            <div className="flex items-center justify-center">
                                                    <button type="button" onClick={() => retryConnect()} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
                                                            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                                                            Change Network
                                                    </button>
                                                    <button type="button" className="text-red-700 bg-transparent border border-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white" data-dismiss-target="#alert-error" aria-label="Close" onClick={() => setAlertClose(true)}>
                                                            Dismiss
                                                    </button>
                                            </div>
                                    </div>
                            ) : ''
                    }
                    {
                        Wallets.map(item => {
                            return (
                                <a key={item.title} className="flex justify-between mx-5 px-4 border-2 border-gray-200 mt-4 vs-border-tip-blue pulse" style={{ borderRadius: "8px" }} onClick={onConnectWallet(item)} disabled={isSelectingWallet ? false : true}>
                                    <div className="flex">
                                        <div className="flex items-center justify-center">
                                            <img className="pr-2 w-10 h-10" src={item.logo} alt="" />
                                        </div>
                                        <TypographySize20 className="flex items-center" style={{ color: "black" }}>{item.title}</TypographySize20>
                                    </div>
                                    <div className="flex items-center">
                                        <div className='wallet-info flex items-center justify-end'>
                                            <div className='loading'>
                                                    {
                                                            !isSelectingWallet && activatingConnector == item.connector && (
                                                                    <div className="spinner-border border-r-transparent animate-spin inline-block ml-2 w-6 h-6 border-4 rounded-full text-blue-300" role="status">
                                                                    </div>
                                                            )
                                                    }
                                                    {
                                                            connector == item.connector && active && (
                                                                    <div className='state ml-4 font-bold'>actived</div>
                                                            )
                                                    }
                                            </div>
                                        </div>
                                        <KeyboardArrowRightIcon />
                                    </div>
                            </a>
                            )
                        })
                    }
                    <div className="py-6 wallet-md px-9" style={{ textAlign: "center", lineHeight: "1.3" }}>
                        <span>By connecting your wallet, you agree to our </span><a href="/#/service" style={{ color: 'black' }}>Terms of Service </a><span>and our </span><a href="/#/privacypolicy" style={{ color: 'black' }}>Privacy Policy</a>
                    </div>
                    
                {
                    active && (
                        <div className="px-4 pt-3 pb-5 flex items-center justify-center">
                            <div className="gradient pulse flex justify-center items-center" >
                                <div className="bg-white gradient-child flex justify-center items-center py-2 px-4"
                                onClick={onDeactiveWallet}
                                >
                                    <a className='connect-btn'>
                                        Disconnect Wallet
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </Dialog>  
        </>
    )
}

export default WalletModal;