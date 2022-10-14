import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Config from '../../app';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    5: 'https://goerli.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825'
};

const rpcUrl = RPC_URLS[Config.netId];//getNodeUrl();
const chainId = parseInt(Config.netId, 10);
export const injected = new InjectedConnector({
    supportedChainIds: [Config.netId], 
});

export const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    bridge: "https://bridge.walletconnect.org",
    // pollingInterval: POLLING_INTERVAL,
});
