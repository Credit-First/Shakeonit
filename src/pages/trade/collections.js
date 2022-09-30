import React, {useEffect} from "react";
import "../../assets/scss/customize.scss";
import { Grid, Hidden } from "@mui/material";
import Styled from "@mui/material/styles/styled";
import Box from "@material-ui/core/Box";
import BoxCenter from "../../components/Box/BoxCenter";
import TradeCard from '../../components/Card/Card';
import { TypographySize14 } from "../../components/Typography/TypographySize";
import CollectionBg from "../../components/Background/collectionbg";
import Web3 from "web3";
import CryptoPunks from "../../abis/NFT/CryptoPunks";
import Bored_Ape_Yacht from "../../abis/NFT/Bored Ape Yacht"


const RPC_URL = 'wss://speedy-nodes-nyc.moralis.io/abdb0d6d64ec4cb0abe4efdd/eth/ropsten/ws';
const web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));

const cryptoPunksCtx = new web3.eth.Contract(CryptoPunks.abi, CryptoPunks.address);
const bored_Ape_Yacht = new web3.eth.Contract(Bored_Ape_Yacht.abi, Bored_Ape_Yacht.address);

const collections = [
    { id: "1", image: "../static/images/cards/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "../static/images/cards/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "../static/images/cards/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

const CollectionContainer = Styled(Box)({
    paddingLeft: "7%",
    paddingRight: "7%"
});


function Collections() {
    const image = "../static/image/cards/Frame 2 (2).png"

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
                <CollectionContainer className="pt-16 pb-24">
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                    >
                        {collections.map((collection) =>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={4}
                                xs={12}
                                key={collection.name}
                                className="mx-4 md:mx-24 lg:mx-4 rounded-2xl">
                                <TradeCard image={collection.image} name={collection.name} id={collection.id} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer>
            </CollectionBg>
        </Box>
    );
}

export default Collections;
