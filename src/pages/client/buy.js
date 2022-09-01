import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { useParams } from "react-router";
import "../../assets/scss/customize.scss";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Styled from "@mui/material/styles/styled";
import BoxCenter from "../../components/Box/BoxCenter";
import BoxBetween from "../../components/Box/BoxBetween";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import RecentActivity from "./recentactivity";
import { TypographySize12, TypographySize14, TypographySize18, TypographySize20, TypographySize32, TypographySize42 } from "../../components/Typography/TypographySize";

const Container = styled.div`
    width: 70%;

    @media only screen and (max-width: 1000px) {
        width : 100%;
    }
`

const AssetCard = styled.div`
    display: flex;
    width: 100%;
    height : 50px;
    margin-right : 10px;
    margin-top : 10px;
    margin-bottom : 10px;
    align-items : center;
    background: linear-gradient(180deg, #6BD2DB 0%, #4994AC 114.29%);

    @media only screen and (max-width: 1000px) {
        width : 100%;
        margin-right : 0px;
    }
`

const Border = styled.div`
    width : 100%;
    height : 250px;
    border : 2px dashed gray;

`

const collections = [
    { id: "1", image: "/static/images/trade/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "/static/images/trade/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "/static/images/trade/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

const ActiveContainer = Styled(Box)({
    marginTop: "4.5rem",
    marginBottom: "3.2rem",
    paddingLeft: "7%",
    paddingRight: "7%"
});

const ListContainer = Styled(Box)({
    width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginBottom: "4.4rem"
});

const ListImage = Styled(Box)({
    width: "38%"
});

const ListContent = Styled(Box)({
    width: "54%",
    height: "100%"
});



function ClientBuy( Id ) {
    const { collectionId } = useParams();

    const collection = collections.filter((item) => item.id == collectionId)[0];

    const [OtherAction, setOtherAction] = useState("");

    const onChange = (event) => {
        setOtherAction(event.target.value);
    }
    if(OtherAction == "counteroffer") {
            document.getElementById("counteroffer").style.display="block";
        }
    // if(OtherAction != "counteroffer") {
    //     document.getElementById("counteroffer").style.display = "none";
    // }
    // console.log(OtherAction);
    
    // const { collectionId } = useParams();
    // const collection = collections.filter((item) => item.id == collectionId)[0];
    return (
        <Box className="bg-list relative">
            <Header />
            <ActiveContainer>
                <TypographySize32>Active Listing</TypographySize32>
            </ActiveContainer>
            <div>
                <ListContainer className="block lg:flex justify-between">
                    <ListImage className="listImage" >
                        <img src={collection.image} style={{ width: "100%" }} />
                    </ListImage>
                    <ListContent className="listContent">
                        <BoxBetween>
                            <BoxCenter className=" px-2 py-2 rounded-xl bg-white">
                                <Avatar className="mx-3" alt="Remy Sharp" src="/static/images/cards/avatar.png" />
                                <TypographySize18 className="flex items-center px-3">Steven Bartlett</TypographySize18>
                            </BoxCenter>
                            <BoxCenter className="flex items-center">
                                <TypographySize12 className="remain-btn pulse1">Remaining 100/500</TypographySize12>
                            </BoxCenter>
                        </BoxBetween>
                        <Box className="" style={{ marginTop: "5%" }}>
                            <TypographySize42 style={{ marginBottom: "2.5%" }}>{collections.name}</TypographySize42>
                            <TypographySize14 style={{ marginBottom: "5%" }} className="my-3">A collection of 10000 owl-looking portraits with varying traits. The NFT gives holders access to private club memberships plus other perks</TypographySize14>
                        </Box>
                        <Box>
                            <Box className="flex">
                                <img src="../static/images/dollar-circle.png" />
                                <TypographySize14 className="flex items-center">Price:</TypographySize14>
                            </Box>
                            <Box className="flex items-center" style={{ marginTop: "4%" }}>
                                <TypographySize32>$700.00</TypographySize32>
                                <TypographySize14 className="pl-6">/ 0.78 ETH</TypographySize14>
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ marginTop: "12%" }}>
                            <a className="flex justify-center btn pulse1 w-full" href="#">Buy</a>
                            <select className="outlined-btn" onChange={onChange} value={OtherAction}>
                                <option value="otheractions" >Other Actions</option>
                                <option value="counteroffer">Counter Offer</option>
                                <option value="openchat">Open a chat</option>
                                <option value="initiatecall">Initiate a Call</option>
                            </select>
                        </Box>
                    </ListContent>
                </ListContainer>
                <ListContainer id="counteroffer" style={{display : "none"}}>
                    <TypographySize20>Your assets</TypographySize20>
                    <Container>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <AssetCard style={{ justifyContent: "space-between" }} className="pr-4">
                                    <img src="../static/images/client/image 14.png" />
                                    <TypographySize20>15</TypographySize20>
                                    <TypographySize20>BNB</TypographySize20>
                                    <img src="../static/images/client/image 20.png" />
                                </AssetCard>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <AssetCard>
                                    <img src="../static/images/client/image 14.png" />
                                    <img className="ml-4" src={collection.image} style={{ height: "100%", width: "auto" }} />
                                    <TypographySize20 className="pl-4">{collection.name}</TypographySize20>
                                </AssetCard>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <AssetCard style={{ justifyContent: "space-between" }} className="pr-4">
                                    <img src="../static/images/client/image 14.png" />
                                    <TypographySize20>1000</TypographySize20>
                                    <TypographySize20>BUSD</TypographySize20>
                                    <img src="../static/images/client/image 21.png" />
                                </AssetCard>
                            </Grid>
                        </Grid>
                    </Container>
                    <div>
                        <TypographySize20>Counter Offer</TypographySize20>
                        <Border className="relative">
                            <ContentCopyIcon style={{ position: "absolute", top: "10px", right: "10px" }} />
                        </Border>
                    </div>
                    <div className="block md:flex justify-between my-12">
                        <div className="flex">
                            <TypographySize20>Estimated Offer Value</TypographySize20>
                            <TypographySize20 className="pl-6">$ 500</TypographySize20>
                        </div>
                        <div>
                            <a className="flex justify-center btn pulse1 px-6" href="#">Make Offer</a>
                        </div>
                    </div>
                </ListContainer>
            </div>
            <Footer />
        </Box>
    );
}

export default ClientBuy;