import abi from "./abi";

const url = window.location.hostname === 'localhost' ? 'localhost:5000' : window.location.hostname;

export default {
    netId: 5,
    updateTime: 35000,
    InfuraId: 'eaf5b124b2cc4797beb8fcabe2c50825',
    network: '',
    test_network: '',
    rpc_url: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    test_rpc_url: 'https://goerli.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    socket_url: url,
    server_url: 'https://shakeonit-backend.herokuapp.com/',
    template_address: '0x645d2B4bfB047566ff60e2E7112373885935EAc4',
    token_magic: {
        address: '0xA397Ff8927f06FF9AbbD883ef546a13f88E82e3D',
        abi: abi.TokenMagic
    },
    shakeonit: {
        address: '0x2ADf76Cdd3D404414B7d850DE0208541EaA2974e',
        abi: abi.Shakeonit
    }
}
