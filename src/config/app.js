import abi from "./abi";

export default {
    netId: 1,
    updateTime: 35000,
    InfuraId: 'eaf5b124b2cc4797beb8fcabe2c50825',
    network: process.env.PUBLIC_NETWORK,
    test_network: process.env.PUBLIC_TEST_NETWORK,
    rpc_url: process.env.PUBLIC_RPC_URL || 'https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    test_rpc_url: process.env.PUBLIC_TEST_RPC_URL || 'https://ropsten.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825',
    art_bloacks: {
        address: '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270',
        abi: abi.ArtBlocks
    },
    azuki: {
        address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        abi: abi.Azuki,
    },
    boredApeYacht: {
        address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        abi: abi.BoredApeYacht
    },
    cryptoPunks: {
        address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
        abi: abi.CryptoPunks
    },
    doodles: {
        address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        abi: abi.Doodles
    },
    artBlocks_account: '0x00dCdd43BD25f78ae91c12f3c295DC11D3065e00',
    azuki_account: '0x645d2B4bfB047566ff60e2E7112373885935EAc4',
    boredApeYacht_account: '0x33569c101562e1fAF5b24581057E5cEE4c8288D7',
    cryptoPunks_account: '0x897aEA3D51DCBA918C41aE23F5d9A7411671DeE0',
    doodles_account: '0xE573C9cDA6f7529cf0b5E51b701857A875891599'
}
