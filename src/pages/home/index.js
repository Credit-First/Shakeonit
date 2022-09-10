import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import GreenLine_h_bg from "../../components/Background/greenline_h_bg";

function Home() {
    return (
        <>
            <Header />
            <BuyBg>
                <BuyAndSell />
            </BuyBg>
            <NFTBG>
                <Container>
                    <NFT />
                </Container>
            </NFTBG>
            <GreenLine_h_bg>
                <Benefit />
            </GreenLine_h_bg>
            <Shakeoint />
            <ExploreBG>
                <ExploreContainer>
                    <Explore />
                </ExploreContainer>
            </ExploreBG>
            <Footer />
        </>
    );
}

export default Home;