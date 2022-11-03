import React, {useContext, useState, useEffect, useCallback} from 'react';
import { Grid, Hidden } from "@mui/material";
import Styled from "@mui/material/styles/styled";
import Box from "@material-ui/core/Box";
import BoxCenter from "../../components/Box/BoxCenter";
import TradeCard from '../../components/Card/Card';
import { TypographySize14 } from "../../components/Typography/TypographySize";
import CollectionBg from "../../components/Background/collectionbg";
import {useParams, useNavigate} from 'react-router-dom';
import NftContext from '../../context/nftContext';
import { useWeb3React } from "@web3-react/core";

const CollectionContainer = Styled(Box)({
    paddingLeft: "7%",
    paddingRight: "7%"
});

const CollectionItems = () => {
    const {address} = useParams();
    const navigate = useNavigate();
    const {account} = useWeb3React();
    const nftCtx = useContext(NftContext);
    const [nfts, setNfts] = useState([]);

    const getNfts = useCallback(() => {
        const nfts = nftCtx.nfts.filter(nft => nft.contract_address === address);
        setNfts(nfts);
    },[nftCtx, address])
    
    useEffect(() => {
        if (nftCtx.nfts.length > 0) getNfts();
    }, [nftCtx, address, account, getNfts]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <CollectionBg>
            <BoxCenter className="relative hidden mt-10">
                <Hidden xlDown>
                    <img src="../static/images/cards/Frame 2 (2).png" alt='' />
                    <TypographySize14 className="modal py-6 px-12">List Your Assets For Sale, Share With Friends And Chat With Potential Buyers</TypographySize14>
                </Hidden>
            </BoxCenter>
            <Hidden xlUp>
                <Box className="collection-bg pt-16 pb-16">
                    <BoxCenter className="sm-text-modal-lg text-sm-title">Your NTF's Collections</BoxCenter>
                    <BoxCenter className="sm-text-modal pl-6 pr-2 py-2 text-md text-black-200">List Your Assets For Sale, Share With Friends And Chat With Potential Buyers</BoxCenter>
                </Box>
            </Hidden>

            <div className="w-fit mt-10 ml-20 mb-10 gradient pulse flex justify-center items-center">
                <div className="bg-white gradient-child flex justify-center items-center">
                    <div 
                    style={{ textAlign: "center" }} onClick={() => navigate(-1)} 
                    className="flex items-center connect-btn px-4 py-3">
                        Back To Collections
                    </div> 
                </div>
            </div>

            <CollectionContainer className="pt-16 pb-24">
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                >
                    {nfts.map((item, index) => {
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
        </CollectionBg>
    )
}

export default CollectionItems;