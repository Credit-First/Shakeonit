import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import styled from "styled-components";

const Header = styled.div`
    @media only screen and (max-width : 1199px) {        
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;

        color: #38435E;

        padding-bottom: 2px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 47px;
        /* identical to box height */
        
        text-align: center;
        
        color: #38435E;

        padding-bottom: 44px;
    }
`
const Title = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: rgba(56, 67, 94, 0.8);

        padding-top: 24px;
        padding-bottom: 13px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #38435E;

        padding-bottom: 32px;
    }
`
const Content = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        /* or 22px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: rgba(11, 18, 45, 0.6);
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        /* or 22px */

        text-align: justify;
        text-transform: capitalize;

        color: rgba(11, 18, 45, 0.6);
    }
`
const Card = styled.div`
    @media only screen and (max-width : 1199px) {
        padding-bottom: 21px;
    }
    @media only screen and (min-width : 1200px) {
        padding-bottom: 21px;
    }
`

function Shakeoint() {
    return (
        <Box className="px-4 md:px-12 lg:px-24 xl:px-72 py-6 md:py-24">
            <Header>Shakeoint brings value to...</Header>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={6}
                    xs={12}
                >
                    <Title>The Creator</Title>
                    <Card>
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <Content>Trade on your terms; return full custody of your assets</Content>
                    </Card>
                    <Card>
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <Content>GEt feedback from potential collectors</Content>
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={6}
                    xs={12}
                >
                    <Title>The Fans</Title>
                    <Card>
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <Content>Buy cheaper and save on platform fees, 80% lower than OpenSea</Content>
                    </Card>
                    <Card>
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <Content>Chat and bargain with the seller</Content>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Shakeoint;