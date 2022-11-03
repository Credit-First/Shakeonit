import React, { useEffect } from "react";
import Container from "../../components/Container/Container";
import ExploreBG from "../../components/Background/ExploreBG";
import BuyAndSell from "./Terms/buyandsell";
import NFT from "./nft";
import NFTBG from "../../components/Background/NFTBG";
import ExploreContainer from "../../components/Container/ExploreContainer";
import Benefit from "./Benefit";
import Shakeoint from "./shakeoint";
import Explore from "./explore";
import BuyBg from "../../components/Background/buybg";
import GreenLineHBg from "../../components/Background/greenline_h_bg";
import { Box } from "@mui/material";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <Box style={{background : "white"}}>
            <BuyBg>
                <BuyAndSell />
            </BuyBg>
            <NFTBG>
                <Container>
                    <NFT />
                </Container>
            </NFTBG>
            <GreenLineHBg>
                <Benefit />
            </GreenLineHBg>
            <Shakeoint />
            <ExploreBG>
                <ExploreContainer>
                    <Explore />
                </ExploreContainer>
            </ExploreBG>
        </Box>
    );
}

export default Home;