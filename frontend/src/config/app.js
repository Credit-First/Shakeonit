import abi from "./abi";

const url = window.location.hostname === 'localhost' ? 'localhost:5000' : window.location.hostname;

export default {
    netId: 97,
    updateTime: 35000,
    InfuraId: 'eaf5b124b2cc4797beb8fcabe2c50825',
    network: '',
    test_network: '',
    rpc_url: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    // test_rpc_url: 'https://goerli.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    test_rpc_url: 'https://data-seed- prebsc-1-s1.binance.org:8545/',
    socket_url: url,
    // server_url: 'https://shakeonit-backend.herokuapp.com/',
    server_url: 'http://localhost:5000/',
    template_address: '0x645d2B4bfB047566ff60e2E7112373885935EAc4',
    token_magic: {
        address: '0xa9b2B3a7e81F26587E88F829a5A447D3f0dB9dA9',
        abi: abi.TokenMagic
    },
    shakeonit: {
        address: '0x1f2184F1B913F3cd71DD7aF254F93F49e21baF26',
        abi: abi.Shakeonit
    },
    nftContract: {
        abi: abi.ERC721
    },
    tokenContract: {
        abi: abi.ERC20
    },
    RouterContract: {
        address: '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3',
        abi: abi.Router,
    }
}
