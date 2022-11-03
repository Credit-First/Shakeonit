import React from "react";
import styled from "styled-components";
import "../../../assets/scss/customize.scss";

const Contain = styled.div`
    @media only screen and (max-width : 720px) {
        width : 70%;
    }
    @media only screen and (min-width : 721px) {
        width: 40%;
    }
`
const Container = styled.div`
    @media only screen and (max-width : 1199px) {
        margin : 20px 4px;
    }
    @media only screen and (min-width : 1200px) {
        margin: 20px 10px;
    }
`
const TradeButton = styled.div`
    @media only screen and (max-width : 1199px) {
        margin-top: 32px;
        width: 204px;
        height: 56px;
        display: inline-table;
    }
    @media only screen and (min-width : 1200px) {
        margin-top: 24px;
        width: 211px;
        height: 56px;
    }
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-align: justify;
    text-transform: capitalize;

    color: #FFFFFF;
`

const TermTitle = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        text-align: justify;
        text-transform: capitalize;
        
        color: #38435E;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 56px;
        text-align: justify;
        text-transform: capitalize;

        color: #38435E;
    }
    margin-bottom: 16px;
`

const TermContent = styled.div`
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
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 140%;

        text-align: justify;
        text-transform: capitalize;

        color: rgba(11, 18, 45, 0.4);
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
            <div className="mt-4 px-6">
                <TermTitle>Buy And Sell NFTs On Your Terms</TermTitle>
                <TermContent>
                    Shakeonit is The No 1 Secondary Marketplace For NFTs. Buy And Sell NFTs Directly With Anyone; Just
                    Shake On It And Trade
                </TermContent>
                <div style={{textAlign: 'center'}}>
                    <TradeButton>
                        <a href="/#/collections" className="btn">Make A Trade</a>
                    </TradeButton>
                </div>
            </div>
        </Container>
    )
}

export default Terms;