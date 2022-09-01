import React from "react";
import styled from "styled-components";
import { TypographySize481, TypographySize24 } from "../../../components/Typography/TypographySize";
import "../../../assets/scss/customize.scss";
import { Button } from "@mui/material";

const Contain = styled.div`
    width : 40%;
    @media only screen and (max-width : 720px) {
        width : 70%;
    }
    @media only screen and (min-width : 721px) and (max-width : 1200px) {
        width: 40%;
    }
`
const Container = styled.div`
    @media only screen and (max-width : 720px) {
        margin : 20px 4px;
    }
    @media only screen and (min-width : 721px) and (max-width : 1200px) {
        margin: 20px 10px;
    }
`
const TradeButton = styled.div`
    width : 30%;
    @media only screen and (max-width : 720px) {
        width: 100%;
        disply : flex;
        justify-content : center;
    }
    @media only screen and (min-width : 721px) and (max-width : 1200px) {
        width : 50%;
        disply : flex;
        justify-content : center;
    }
`

function Terms() {
    return (
        <Container>
            <div className="flex justify-center">
                <Contain>
                    <img src="static/images/home/Group95.png" alt="" />
                </Contain>
            </div>
            <div className=" mt-4 px-6">
                <TypographySize481>Buy And Sell NFTs On Your Terms</TypographySize481>
                <TypographySize24 className="mt-3">
                    Shakeoint is The No 1 Secondary Marketplace For NFTs. Buy And Sell NFTs Directly With Anyone; Just
                    Shake On It And Trade
                </TypographySize24>
            </div>
            <div className="mt-6 px-6">
                <TradeButton>
                    <a href="/collections" className="btn px-5 py-3 pulse">Make a Trade</a>
                </TradeButton>
            </div>
        </Container>
    )
}

export default Terms;