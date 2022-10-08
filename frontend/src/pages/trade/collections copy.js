import React, {useState, useEffect} from "react";
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
import { httpGet } from "../../utils/http.utils";
import CollectionCard from "../../components/Card/CollectionCard";

const collections = [
    { id: 1, image: "../static/images/collections/azuki.avif", name: "azuki", label: "Azuki" }, 
    { id: 2, image: "../static/images/collections/bored_ape_kennel.avif", name: "boredApeKennel", label: "Bored Ape Kennel" },
    { id: 3, image: "../static/images/collections/bored_ape_yacht.avif", name: "boredApeYacht", label: "Bored Ape Yacht" },
    { id: 4, image: "../static/images/collections/cryptopunks.avif", name: "cryptoPunks", label: "CryptoPunks" },
    { id: 5, image: "../static/images/collections/clonex.avif", name: "cloneX", label: "CloneX" }, 
    { id: 6, image: "../static/images/collections/doodles.avif", name: "doodles", label: "Doodles" },
    { id: 7, image: "../static/images/collections/deadfellaz.avif", name: "deadFellaz", label: "DeadFellaz" },
    { id: 8, image: "../static/images/collections/mutant_ape_yacht.avif", name: "mutantApeYacht", label: "Mutant Ape Yacht" },
    { id: 9, image: "../static/images/collections/moonbirds.avif", name: "moonbirds", label: "Moonbirds" },
    { id: 10, image: "../static/images/collections/otherside.avif", name: "otherside", label: "Otherside" },
];

const CollectionContainer = Styled(Box)({
    paddingLeft: "7%",
    paddingRight: "7%"
});

function Collections() {
    const [balance, setBalance] = useState({
        otherside: 0,
        azuki: 0,
        boredApeYacht: 0,
        cryptoPunks: 0,
        doodles: 0,
        boredApeKennel: 0,
        cloneX: 0,
        mutantApeYacht: 0,
        moonbirds: 0,
        deadFellaz: 0
    });
    const [loading, setLoading] = useState({
        azuki: true,
        boredApeYacht: true,
        boredApeKennel: true,
        cryptoPunks: true,
        cloneX: true,
        doodles: true,
        deadFellaz: true,
        mutantApeYacht: true,
        moonbirds: true,
        otherside: true,

    })
    const [collectionShow, setCollectionShow] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [othersideNFT, setOthersideNFT] = useState([]);
    const [azukiNFT, setAzukiNFT] = useState([]);
    const [boredApeYachtNFT, setBoredApeYachtNFT] = useState([]);
    const [cryptoPunksNFT, setCryptoPunksNFT] = useState([]);
    const [doodlesNFT, setDoodlesNFT] = useState([]);
    const [boredApeKennelNFT, setBoredApeKennelNFT] = useState([]);
    const [cloneXNFT, setCloneXNFT] = useState([]);
    const [deadFellazNFT, setDeadFellazNFT] = useState([]);
    const [mutantApeYachtNFT, setMutantApeYachtNFT] = useState([]);
    const [moonbirdsNFT, setMoonbirdsNFT] = useState([]);

    const handleSelectCollection = (name) => {
        setSelectedCollection(name);
        setCollectionShow(!collectionShow);
    }

    const getOthersideNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.otherside_account).call();
        setBalance((state) => ({...state, otherside:totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.otherside_account, i).call();
            try {
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                const { image, name, collection_name, description } = await httpGet(tokenURI);
                setOthersideNFT((list) => {
                    return [...list, { tokenId, image, name, collection_name, description }]
                });
            } catch (error) {
            }
        }
        setLoading((state) => ({...state, otherside: false}));
    }
    const getOthersideBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.otherside_account).call();
        setBalance((state) => ({...state, otherside:totalSupply}));
    }
    const getCloneXNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.cloneX_account).call();
        setBalance((state) => ({...state, cloneX:totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.cloneX_account, i).call();
            try {
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                const { image, name, description } = await httpGet(tokenURI);
                setCloneXNFT((list) => {
                    return [...list, { tokenId, image, name, description }]
                });
            } catch (error) {
            }
        }
        setLoading((state) => ({...state, cloneX: false}));
    }
    const getCloneXBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.cloneX_account).call();
        setBalance((state) => ({...state, cloneX:totalSupply}));
    }
    const getMutantApeYachtNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.mutantApeYacht_account).call();
        setBalance((state) => ({...state, mutantApeYacht: totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.mutantApeYacht_account, i).call();

            try {
                let name = `Mutant Ape Yacht #${tokenId}`;
                let tokenURI = await contract.methods.tokenURI(tokenId).call();
                let { image } = await httpGet(tokenURI);
                image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
                setMutantApeYachtNFT((list) => {
                    return [...list, { tokenId, image, name }]
                });
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, mutantApeYacht: false}));
    }
    const getMutantApeYachtBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.mutantApeYacht_account).call();
        setBalance((state) => ({...state, mutantApeYacht:totalSupply}));
    }
    const getDeadFellazNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.deadFellaz_account).call();
        setBalance((state) => ({...state, deadFellaz:totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.deadFellaz_account, i).call();
            try {
                let tokenURI = await contract.methods.tokenURI(tokenId).call();
                tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                const { image, name, description } = await httpGet(tokenURI);
                setDeadFellazNFT((list) => {
                    return [...list, { tokenId, image, name, description }]
                });
            } catch (error) {
            }
        }
        setLoading((state) => ({...state, deadFellaz: false}));
    }
    const getDeadFellazBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.deadFellaz_account).call();
        setBalance((state) => ({...state, deadFellaz:totalSupply}));
    }
    const getMoonbirdsNFT = async (contract) => {
        const totalSupply = await contract.methods.totalSupply().call();
        const balance = await contract.methods.balanceOf(Config.moonbirds_account).call();

        for (let i = 0, j = 0; i < totalSupply, j < balance; i++) {
            const tokenId = i;
            const owner = await contract.methods.ownerOf(i).call();

            try {
                if(owner === Config.moonbirds_account) {
                    const name = `Moonbirds #${tokenId}`;
                    const tokenURI = await contract.methods.tokenURI(tokenId).call();
                    const { image } = await httpGet(tokenURI);

                    setMoonbirdsNFT((list) => {
                        return [...list, { tokenId, image, name }]
                    });
                    
                    j++;
                }
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, moonbirds: false}));
    }
    const getMoonbirdsBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.moonbirds_account).call();
        setBalance((state) => ({...state, moonbirds:totalSupply}));
    }
    const getBoredApeKennelNFT = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.boredApeKennel_account).call();
        setBalance((state) => ({...state, boredApeKennel: totalSupply}));
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(Config.boredApeKennel_account, i).call();
            try {
                let name = 'BORED APE KENNEL #' + tokenId;
                let tokenURI = await contract.methods.tokenURI(tokenId).call();
                tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                let { image } = await httpGet(tokenURI);
                image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
                setBoredApeKennelNFT((list) => {
                    return [...list, { tokenId, image, name }]
                });
            } catch (error) {
                
            }
        }
        setLoading((state) => ({...state, boredApeKennel: false}));
    }
    const getBoredApeKennelBalance = async (contract) => {
        const totalSupply = await contract.methods.balanceOf(Config.boredApeKennel_account).call();
        setBalance((state) => ({...state, boredApeKennel:totalSupply}));
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
        const Otherside = new web3.eth.Contract(Config.otherside.abi, Config.otherside.address);
        const Azuki = new web3.eth.Contract(Config.azuki.abi, Config.azuki.address);
        const BoredApeYacht = new web3.eth.Contract(Config.boredApeYacht.abi, Config.boredApeYacht.address);
        const CryptoPunks = new web3.eth.Contract(Config.cryptoPunks.abi, Config.cryptoPunks.address);
        const Doodles = new web3.eth.Contract(Config.doodles.abi, Config.doodles.address);
        const CloneX = new web3.eth.Contract(Config.cloneX.abi, Config.cloneX.address);
        const MutantApeYacht = new web3.eth.Contract(Config.mutantApeYacht.abi, Config.mutantApeYacht.address);
        const DeadFellaz = new web3.eth.Contract(Config.deadFellaz.abi, Config.deadFellaz.address);
        const Moonbirds = new web3.eth.Contract(Config.moonbirds.abi, Config.moonbirds.address);
        const BoredApeKennel = new web3.eth.Contract(Config.boredApeKennel.abi, Config.boredApeKennel.address);

        getOthersideBalance(Otherside);
        getAzukiBalance(Azuki);
        getBoredApeYachtBalance(BoredApeYacht);
        getCryptoPunksBalance(CryptoPunks);
        getDoodlesBalance(Doodles);
        getCloneXBalance(CloneX);
        getMutantApeYachtBalance(MutantApeYacht);
        getDeadFellazBalance(DeadFellaz);
        getMoonbirdsBalance(Moonbirds);
        getBoredApeKennelBalance(BoredApeKennel);

        getOthersideNFT(Otherside);
        getAzukiNFT(Azuki);
        getBoredApeYachtNFT(BoredApeYacht);
        getCryptoPunksNFT(CryptoPunks);
        getDoodlesNFT(Doodles);
        getCloneXNFT(CloneX);
        getMutantApeYachtNFT(MutantApeYacht);
        getDeadFellazNFT(DeadFellaz);
        getMoonbirdsNFT(Moonbirds);
        getBoredApeKennelNFT(BoredApeKennel);
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
                style={ selectedCollection === "otherside" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.otherside && othersideNFT.length === 0 && <div>No Items</div>}
                    {loading.otherside && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {selectedCollection === "otherside" && othersideNFT.map((item, index) => {
                            return (
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xl={4}
                                    xs={12}
                                    key={index}
                                    className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                    <TradeCard {...item} />
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
                                <TradeCard {...item} />
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
                                <TradeCard {...item} />
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
                                <TradeCard {...item} />
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
                                <TradeCard {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>
                <CollectionContainer className="pb-24"
                style={ selectedCollection === "boredApeKennel" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.boredApeKennel && boredApeKennelNFT.length === 0 && <div>No Items</div>}
                    {loading.boredApeKennel && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {selectedCollection === "boredApeKennel" && boredApeKennelNFT.map((item, index) => {
                            return (
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xl={4}
                                    xs={12}
                                    key={index}
                                    className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                    <TradeCard {...item} />
                                </Grid>
                            )
                        } 
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "cloneX" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.cloneX && cloneXNFT.length === 0 && <div>No Items</div>}
                    {loading.cloneX && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {cloneXNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "deadFellaz" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.deadFellaz && deadFellazNFT.length === 0 && <div>No Items</div>}
                    {loading.deadFellaz && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {deadFellazNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "mutantApeYacht" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.mutantApeYacht && mutantApeYachtNFT.length === 0 && <div>No Items</div>}
                    {loading.mutantApeYacht && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {mutantApeYachtNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>

                <CollectionContainer className="pb-24"
                style={ selectedCollection === "moonbirds" ? {display: 'block'} : {display: 'none'}}>
                    {!loading.moonbirds && moonbirdsNFT.length === 0 && <div>No Items</div>}
                    {loading.moonbirds && <div>Loading...</div>}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {moonbirdsNFT.map((item, index) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={index}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>
            </CollectionBg>
        </Box>
    );
}

export default Collections;
