import React, {useState, useEffect} from "react";
import clsx from 'clsx';
import "../../assets/scss/customize.scss";
import { Grid, Hidden } from "@mui/material";
import Styled from "@mui/material/styles/styled";
import Box from "@material-ui/core/Box";
import BoxCenter from "../../components/Box/BoxCenter";
import TradeCard from '../../components/Card/Card';
import { TypographySize14 } from "../../components/Typography/TypographySize";
import CollectionBg from "../../components/Background/collectionbg";
import Config from '../../config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { httpGet } from "../../utils/http.utils";
import CollectionCard from "../../components/Card/CollectionCard";

const collections = [
    { id: 1, image: "../static/images/collections/art_blocks.avif", name: "artBlocks", label: "Art Blocks" },
    { id: 2, image: "../static/images/collections/azuki.avif", name: "azuki", label: "Azuki" }, 
    { id: 3, image: "../static/images/collections/bored_ape_yacht.avif", name: "boredApeYacht", label: "Bored Ape Yacht" },
    { id: 4, image: "../static/images/collections/cryptopunks.avif", name: "cryptoPunks", label: "CryptoPunks" },
    { id: 5, image: "../static/images/collections/doodles.avif", name: "doodles", label: "Doodles" },
];

const CollectionContainer = Styled(Box)({
    paddingLeft: "7%",
    paddingRight: "7%"
});

const image = "../static/image/cards/Frame 2 (2).png";

function Collections() {
    const { account } = useWeb3React();
    const [balance, setBalance] = useState({
        artBlocks: 0,
        azuki: 0,
        boredApeYacht: 0,
        cryptoPunks: 0,
        doodles: 0
    });
    const [loading, setLoading] = useState({
        artBlocks: true,
        azuki: true,
        boredApeYacht: true,
        cryptoPunks: true,
        doodles: true
    })
    const [collectionShow, setCollectionShow] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [artBlocksNFT, setArtBlocksNFT] = useState([]);
    const [azukiNFT, setAzukiNFT] = useState([]);
    const [boredApeYachtNFT, setBoredApeYachtNFT] = useState([]);
    const [cryptoPunksNFT, setCryptoPunksNFT] = useState([]);
    const [doodlesNFT, setDoodlesNFT] = useState([]);

    const handleSelectCollection = (name) => {
        setSelectedCollection(name);
        setCollectionShow(!collectionShow);
    }

    const getArtBlocksNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.artBlocks_account).call();
        setBalance((state) => ({...state, artBlocks:totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.artBlocks_account, i).call();
            try {
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                const { image, name, collection_name, description } = await httpGet(tokenURI);
                setArtBlocksNFT((list) => {
                    return [...list, { tokenId, image, name, collection_name, description }]
                });
            } catch (error) {
            }
        }
        setLoading((state) => ({...state, artBlocks: false}));
    }
    const getArtBlocksBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.artBlocks_account).call();
        setBalance((state) => ({...state, artBlocks:totalSupply}));
    }
    const getAzukiNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.azuki_account).call();
        setBalance((state) => ({...state, azuki:totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.azuki_account, i).call();
            try {
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                const { image, name } = await httpGet(tokenURI);
                setAzukiNFT((list) => {
                    return [...list, { tokenId, image, name }]
                });
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, azuki: false}));
    }
    const getAzukiBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.azuki_account).call();
        setBalance((state) => ({...state, azuki:totalSupply}));
    }
    const getBoredApeYachtNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.boredApeYacht_account).call();
        setBalance((state) => ({...state, boredApeYacht: totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.boredApeYacht_account, i).call();
            try {
                let name = 'BORED APE #' + tokenId;
                let tokenURI = await contract.methods.tokenURI(tokenId).call();
                tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                let { image } = await httpGet(tokenURI);
                image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
                setBoredApeYachtNFT((list) => {
                    return [...list, { tokenId, image, name }]
                });
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, boredApeYacht: false}));
    }
    const getBoredApeYachtBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.boredApeYacht_account).call();
        setBalance((state) => ({...state, boredApeYacht:totalSupply}));
    }
    const getCryptoPunksNFT = async (contract) => {
        const totalSupply = await contract.methods.totalSupply().call();
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = i;
            const owner = await contract.methods.punkIndexToAddress(i).call();

            try {
                if(owner === Config.cryptoPunks_account) {
                    let name = 'CryptoPunk #' + tokenId;
                    let image = `https://cryptopunks.app/cryptopunks/cryptopunk${tokenId}.png`;
                    setCryptoPunksNFT((list) => {
                        return [...list, { tokenId, image, name }]
                    });
                }
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, cryptoPunks: false}));
    }
    const getCryptoPunksBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.cryptoPunks_account).call();
        setBalance((state) => ({...state, cryptoPunks: totalSupply}));
    }
    const getDoodlesNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.doodles_account).call();
        setBalance((state) => ({...state, doodles: totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.doodles_account, i).call();

            try {
                let tokenURI = await contract.methods.tokenURI(tokenId).call();
                tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                let { image, name } = await httpGet(tokenURI);
                image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
                setDoodlesNFT((list) => {
                    return [...list, { tokenId, image, name }]
                });
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, doodles: false}));
    }
    const getDoodlesBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.doodles_account).call();
        setBalance((state) => ({...state, doodles:totalSupply}));
    }
    const loadContract = () => {
        const web3 = new Web3(Web3.givenProvider);
        const ArtBlocks = new web3.eth.Contract(Config.art_bloacks.abi, Config.art_bloacks.address);
        const Azuki = new web3.eth.Contract(Config.azuki.abi, Config.azuki.address);
        const BoredApeYacht = new web3.eth.Contract(Config.boredApeYacht.abi, Config.boredApeYacht.address);
        const CryptoPunks = new web3.eth.Contract(Config.cryptoPunks.abi, Config.cryptoPunks.address);
        const Doodles = new web3.eth.Contract(Config.doodles.abi, Config.doodles.address);

        getArtBlocksBalance(ArtBlocks);
        getAzukiBalance(Azuki);
        getBoredApeYachtBalance(BoredApeYacht);
        getCryptoPunksBalance(CryptoPunks);
        getDoodlesBalance(Doodles);

        getArtBlocksNFT(ArtBlocks);
        getAzukiNFT(Azuki);
        getBoredApeYachtNFT(BoredApeYacht);
        getCryptoPunksNFT(CryptoPunks);
        getDoodlesNFT(Doodles);
    }

    useEffect(() => {
        loadContract();
    }, []);

    return (
        <Box style={{ backgroundColor: "#f5fafe" }}>
            <CollectionBg>
                <BoxCenter className="relative hidden mt-10">
                    <Hidden xlDown>
                        <img src="../static/images/cards/Frame 2 (2).png" />
                        <TypographySize14 className="modal py-6 px-12">List your assets for sale, share with friends and chat with potential buyers</TypographySize14>
                    </Hidden>
                </BoxCenter>
                <Hidden xlUp className="lg:hidden">
                    <Box className="collection-bg pt-16 pb-16">
                        <BoxCenter className="sm-text-modal-lg text-sm-title">Your NTF's Collections</BoxCenter>
                        <BoxCenter className="sm-text-modal pl-6 pr-2 py-2 text-md text-black-200">List your assets for sale, share with friends and chat with potential buyers</BoxCenter>
                    </Box>
                </Hidden>
                {
                    collectionShow ? 
                        <CollectionContainer className="pt-16 pb-24">
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                            >
                                {collections.map((item, index) =>
                                    <Grid
                                        item
                                        lg={4}
                                        md={4}
                                        xl={4}
                                        xs={12}
                                        key={index}
                                        className="mx-4 md:mx-24 lg:mx-4 rounded-xl">
                                        <CollectionCard onSelect={handleSelectCollection} {...item} balance={balance[item.name]} />
                                    </Grid>
                                )}
                            </Grid>
                        </CollectionContainer> 
                        :
                        <div className="w-fit mt-10 ml-20 mb-10 gradient pulse flex justify-center items-center">
                            <div className="bg-white gradient-child flex justify-center items-center">
                                <a 
                                style={{ textAlign: "center" }} onClick={() => handleSelectCollection('')} 
                                className="flex items-center connect-btn px-4 py-3">
                                    Back to collections
                                </a> 
                            </div>
                        </div>
                }

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "artBlocks" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.artBlocks && artBlocksNFT.length === 0 && <div>No Items</div>}
                    {loading.artBlocks && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {selectedCollection === "artBlocks" && artBlocksNFT.map((item, index) => {
                            return (
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xl={4}
                                    xs={12}
                                    key={index}
                                    className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                    <TradeCard image={item.image} name={item.name} id={item.id} description={item.description} collectionName={item.collection_name} />
                                </Grid>
                            )
                        } 
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "azuki" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.azuki && azukiNFT.length === 0 && <div>No Items</div>}
                    {loading.azuki && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {azukiNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard image={item.image} name={item.name} id={item.id} description={item.description} collectionName={item.collection_name} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "boredApeYacht" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.boredApeYacht && boredApeYachtNFT.length === 0 && <div>No Items</div>}
                    {loading.boredApeYacht && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {boredApeYachtNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard image={item.image} name={item.name} id={item.id} description={item.description} collectionName={item.collection_name} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "cryptoPunks" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.cryptoPunks && cryptoPunksNFT.length === 0 && <div>No Items</div>}
                    {loading.cryptoPunks && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {cryptoPunksNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard image={item.image} name={item.name} id={item.id} description={item.description} collectionName={item.collection_name} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "doodles" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.doodles && doodlesNFT.length === 0 && <div>No Items</div>}
                    {loading.doodles && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {doodlesNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard image={item.image} name={item.name} id={item.id} description={item.description} collectionName={item.collection_name} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>
            </CollectionBg>
        </Box>
    );
}

export default Collections;
