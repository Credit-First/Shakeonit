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
        logo: '../static/images/modal/wallets/4.png',
        connector: walletconnect,
    },
    {
        title: "CoinbaseWallet",
        description: "Open in Coinbase Wallet app.",
        logo: '../static/images/modal/wallets/5.png',
        connector: walletconnect,
    }
];

export { Wallets };
