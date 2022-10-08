import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./connectors";

const Wallets = [
    {
        title: "MetaMask",
        description: "Connect to your MetaMask Wallet",
        logo: '../static/images/modal/wallets/1.png',
        
        connector: injected,
    },
    {
        title: "WalletConnect",
        description: "Connect to your WalletConnect Wallet",
        logo: '../static/images/modal/wallets/2.png',
        connector: walletconnect,
    },
    {
        title: "CoinbaseWallet",
        description: "Open in Coinbase Wallet app.",
        logo: '../static/images/modal/wallets/3.png',
        connector: walletconnect,
    }
];

export { Wallets };
