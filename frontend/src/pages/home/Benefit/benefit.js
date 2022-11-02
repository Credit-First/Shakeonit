import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

const Header = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: left;
        
        color: #38435E;

        margin-top: 28px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 47px;
        /* identical to box height */
        
        text-align: justify;
        
        color: #38435E;

        padding-bottom: 32px;
    }
`
const Title = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        /* identical to box height, or 16px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: #38435E;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 100%;
        /* or 24px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: #38435E;

        padding-top: 12px;
    }
`
const Logo = styled.img`
    @media only screen and (max-width : 1199px) {
        width: 48px;
        height: 48px;
    }
    @media only screen and (min-width : 1200px) {
        width: 100px;
        height: 100px;
    }
`
const LogoInside = styled.img`
    @media only screen and (max-width : 1199px) {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 12px;
        left: 12px;
    }
    @media only screen and (min-width : 1200px) {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 25px;
        left: 25px;
    }
`
const Content = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        /* or 20px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: rgba(11, 18, 45, 0.4);

        padding-top: 8px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        /* or 20px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: rgba(11, 18, 45, 0.4);

        padding-top: 12px;
    }
`
const Card = styled.div`
    @media only screen and (max-width : 1199px) {
        min-height: 48px;
        padding-left: 8px;
    }
    @media only screen and (min-width : 1200px) {
        min-height: 100px;
        padding-left: 40px;
    }
`

function OurBenefit() {
    return (
        <Box>
            <div>
                <img src="/static/images/home/Vector 19.png" alt="vector" className="py-3 ml-6 desktop-visible" />
                <Header>Our Benefits</Header>
            </div>
            <Box className="lg:mx-10 my-10">
                <Box className="relative" style={{ float: "left" }}>
                    <Logo src="static/images/home/Group 4460.png" alt="" />
                    <LogoInside src="static/images/home/ranking.png" alt="" />
                </Box>

                <Box className="flex items-center">
                    <Card>
                        <Title>Low Fees</Title>
                        <Content>We Offer One Of The Lowest Platform Fees In The Industry</Content>
                    </Card>
                </Box>
            </Box>
            <Box className="lg:mx-10 my-10">
                <Box className="relative" style={{ float: "left" }}>
                    <Logo src="static/images/home/Group 4460.png" alt="" />
                    <LogoInside src="static/images/home/lamp-charge.png" alt="" />
                </Box>
                <Box className="flex items-center">
                    <Card>
                        <Title>Chat with prospects </Title>
                        <Content>Voice or text, you choose. Chat with potential collectors, and get feedback</Content>
                    </Card>
                </Box>
            </Box>
            <Box className="lg:mx-10 my-10">
                <Box className="relative" style={{ float: "left" }}>
                    <Logo src="static/images/home/Group 4460.png" alt="" />
                    <LogoInside src="static/images/home/home-trend-up.png" alt="" />
                </Box>
                <Box className="flex items-center">
                    <Card>
                        <Title>Multichain Support </Title>
                        <Content>List and explore collectibles across several blockchains</Content>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}

export default OurBenefit;