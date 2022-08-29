import { Box } from "@mui/material";
import React from "react";
import Container from "@material-ui/core/Container";
import { Avatar } from "@mui/material";
import { useParams } from "react-router";
import "../../../assets/scss/customize.scss";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Styled from "@mui/material/styles/styled";
import BoxCenter from "../../../components/Box/BoxCenter";
import BoxBetween from "../../../components/Box/BoxBetween";
import RecentActivity from "./recentactivity";
import { TypographySize12, TypographySize14, TypographySize18, TypographySize32, TypographySize42 } from "../../../components/Typography/TypographySize";

const collections = [
    { id: "1", image: "/static/images/trade/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "/static/images/trade/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "/static/images/trade/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

const ActiveContainer = Styled(Box) ({
    marginTop : "4.5rem",
    marginBottom : "3.2rem",
    paddingLeft: "7%",
    paddingRight: "7%"
});

const ListContainer = Styled(Box)({
    width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginBottom : "4.4rem"
});

const ListImage = Styled(Box)({
    width: "38%"
});

const ListContent = Styled(Box)({
    width: "54%",
    height : "100%"
});

function List() {
    const { collectionId } = useParams();
    const collection = collections.filter((item) => item.id == collectionId)[0];
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
                        <Box className="" style={{marginTop : "5%"}}>
                            <TypographySize42 style={{marginBottom : "2.5%"}}>{collection.name}</TypographySize42>
                            <TypographySize14 style={{marginBottom : "5%"}} className="my-3">A collection of 10000 owl-looking portraits with varying traits. The NFT gives holders access to private club memberships plus other perks</TypographySize14>
                        </Box>
                        <Box>
                            <Box className="flex">
                                <img src="/static/images/dollar-circle.png" />
                                <TypographySize14 className="flex items-center">Price:</TypographySize14>
                            </Box>
                            <Box className="flex items-center" style={{marginTop : "4%"}}>
                                <TypographySize32>$700.00</TypographySize32>
                                <TypographySize14 className="pl-6">/ 0.78 ETH</TypographySize14>
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{marginTop : "12%"}}>
                            <a className="flex justify-center btn pulse1 w-full" href="#">Change Price</a>
                            <a className="flex justify-center outlined-btn connect-btn pulse1 w-full" href="/collections">Cancel Sale</a>
                        </Box>
                    </ListContent>
                </ListContainer>
                <RecentActivity />
            </div>
            <Footer />
        </Box>
    );
}

export default List;