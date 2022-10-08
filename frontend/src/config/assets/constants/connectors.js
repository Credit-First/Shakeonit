import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    0: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
};

const rpcUrl = RPC_URLS[0];//getNodeUrl();
const chainId = parseInt('1', 10);
export const injected = new InjectedConnector({
    supportedChainIds: [1], 
});

export const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    bridge: "https://bridge.walletconnect.org",
    // pollingInterval: POLLING_INTERVAL,
});
