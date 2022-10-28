import abi from "./abi";

// const url = window.location.hostname === 'localhost' ? 'localhost:5000' : window.location.hostname;
const url = '10.10.10.75:5000';

export default {
    netId: 5,
    updateTime: 35000,
    InfuraId: 'eaf5b124b2cc4797beb8fcabe2c50825',
    network: '',
    test_network: '',
    rpc_url: 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    test_rpc_url: 'https://goerli.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    socket_url: url,
    server_url: 'http://' + url,
    template_address: '0x645d2B4bfB047566ff60e2E7112373885935EAc4',
    token_magic: {
        address: '0xA397Ff8927f06FF9AbbD883ef546a13f88E82e3D',
        abi: abi.TokenMagic
    },
    shakeonit: {
        address: '0xfAC8f257f758bF8513C53eccf3e3391C6f86eC16',
        abi: abi.Shakeonit
    },
    nftContract: {
        abi: abi.ERC721
    },
    tokenContract: {
        abi: abi.ERC20
    }
}
