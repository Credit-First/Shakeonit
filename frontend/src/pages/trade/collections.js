import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import "../../assets/scss/customize.scss";
import { Grid, Hidden } from "@mui/material";
import Styled from "@mui/material/styles/styled";
import Box from "@material-ui/core/Box";
import BoxCenter from "../../components/Box/BoxCenter";
import { TypographySize14 } from "../../components/Typography/TypographySize";
import CollectionBg from "../../components/Background/collectionbg";
import CollectionCard from "../../components/Card/CollectionCard";
import { useWeb3React } from "@web3-react/core";
import NftContext from '../../context/nftContext';

const CollectionContainer = Styled(Box)({
    paddingLeft: "7%",
    paddingRight: "7%"
});

function Collections() {
    const navigate = useNavigate();
    const nftCtx = useContext(NftContext);
    const {account, chainId} = useWeb3React();
    const [collections, setCollections] = useState([]);
    const [searchAddress, setSearchAddress] = useState('');
    
    const handleSelectCollection = (address) => {
        navigate(`/collectionItems/${address}`)
    }

    const handleSearch = () => {
        if(searchAddress.length == 42 && searchAddress.includes('0x')) {
            nftCtx.getNfts(chainId, searchAddress);
        }
    }
    useEffect(() => {
        setCollections(nftCtx.collections);
    }, [nftCtx]);

    useEffect(() => {
        account && setSearchAddress(account);
    }, [account]);
    
    return (
        <Box style={{ backgroundColor: "#f5fafe" }}>
            <CollectionBg>
                <BoxCenter className="relative hidden mt-10">
                    <Hidden xlDown>
                        <img src="../static/images/cards/Frame 2 (2).png" alt="" />
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
                    !account && <div className="flex items-center justify-center mt-10">
                        <span className="text-2xl">Please check your wallet connection</span>
                    </div>
                }

                <div className="flex items-center justify-center mt-10">
                    <div className="flex">
                        <input className="w-[400px] border border-gray-800 rounded-l-xl py-2 px-3 focus:outline-none focus-visible:outline-none" 
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}/>
                        <a className='btn px-6 py-3 pulse rounded-l-none text-xl' onClick={handleSearch}>Search</a>
                    </div>
                </div>

                {
                    collections.length === 0 && 
                    <div className="flex items-center justify-center mt-10">
                        <div className="">No collections</div>
                    </div>
                }

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
                                <CollectionCard onSelect={handleSelectCollection} {...item} />
                            </Grid>
                        )}
                    </Grid>
                </CollectionContainer> 

            </CollectionBg>
        </Box>
    );
}

export default Collections;
