import abi from "./abi";

const url = window.location.hostname == 'localhost' ? 'localhost:5000' : window.location.hostname;

export default {
    netId: 1,
    updateTime: 35000,
    InfuraId: 'eaf5b124b2cc4797beb8fcabe2c50825',
    network: '',
    test_network: '',
    rpc_url: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    socket_url: url,
    server_url: 'http://' + url,
    template_address: '0x645d2B4bfB047566ff60e2E7112373885935EAc4'
}
