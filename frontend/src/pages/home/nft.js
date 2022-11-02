import React from "react";
import Grid from "@mui/material/Grid";
import styled from "styled-components";

const Container = styled.div`
    @media only screen and (max-width : 1199px) {
        margin-top: 30px;
    }
    @media only screen and (min-width : 1200px) {
        margin-top: 150px;
    }
`
const NftSell = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: justify;
        
        color: #38435E;

        margin-bottom: 1rem;
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

        margin-bottom: 8rem;
    }
`

const NftSellContent = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        /* or 20px */
        
        text-transform: capitalize;
        
        color: rgba(11, 18, 45, 0.6);

        margin-bottom: 28px;
    }
    @media only screen and (min-width : 1200px) {
    }
`
const NftSellCard = styled.div`
    @media only screen and (max-width : 1199px) {
        padding: 20px;
    }
    @media only screen and (min-width : 1200px) {
        padding: 40px;
    }
`
const NftCardTitle = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        /* or 22px */
        
        color: #38435E;

        margin-top: 20px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 140%;
        /* identical to box height, or 34px */
        
        color: #38435E;

        margin-top: 22px;
    }
`
const NftCardContent = styled.div`
    @media only screen and (max-width : 1199px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        /* or 20px */
        
        text-align: justify;
        text-transform: capitalize;
        
        color: rgba(11, 18, 45, 0.6);

        margin-top: 4px;
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

        color: rgba(11, 18, 45, 0.6);

        margin-top: 12px;
    }
`

function NFT() {
    return (
        <Container>
            <Grid
                container
            >
                <Grid
                    item
                    lg={4}
                    md={12}
                    xl={4}
                    xs={12}
                    className="flex items-center"
                >
                    <div>
                        <img src="/static/images/home/Vector 19.png" alt="vector" className="py-3 desktop-visible" />
                        <NftSell>Sell your NTFs</NftSell>
                        <NftSellContent className="mobile-visible">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis faucibus sit dolor sed nec libero.</NftSellContent>
                    </div>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={8}
                    xs={12}
                >
                    <div className="">
                        <div className="gap-0 lg:gap-10 grid grid-cols-1 lg:grid-cols-2">
                            <div>
                                <NftSellCard className="border-2 text-justify rounded-xl bg-white">
                                    <div className="relative">
                                        <img src="static/images/home/Ellipse 17.png" alt="" />
                                        <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                    </div>
                                    <NftCardTitle >Connect your wallet</NftCardTitle>
                                    <NftCardContent>After You've Setup A Compatible Wallet,
                                        Connect To Shakeoint By Trading The Connect
                                        Wallet Button On The Top Right Corner.
                                    </NftCardContent>
                                </NftSellCard>
                                <NftSellCard className="border-2 text-justify mt-10 rounded-xl bg-white">
                                    <div className="relative">
                                        <img src="static/images/home/Ellipse 17.png" alt="" />
                                        <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                    </div>
                                    <NftCardTitle >Connect your wallet</NftCardTitle>
                                    <NftCardContent>After You've Setup A Compatible Wallet,
                                        Connect To Shakeoint By Trading The Connect
                                        Wallet Button On The Top Right Corner.
                                    </NftCardContent>
                                </NftSellCard>
                            </div>
                            <div>
                                <NftSellCard className="border-2 text-justify my-10 rounded-xl bg-white">
                                    <div className="relative">
                                        <img src="static/images/home/Ellipse 17.png" alt="" />
                                        <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                    </div>
                                    <NftCardTitle >Connect your wallet</NftCardTitle>
                                    <NftCardContent>After You've Setup A Compatible Wallet,
                                        Connect To Shakeoint By Trading The Connect
                                        Wallet Button On The Top Right Corner.
                                    </NftCardContent>
                                </NftSellCard>
                                <NftSellCard className="border-2 text-justify my-10 rounded-xl bg-white">
                                    <div className="relative">
                                        <img src="static/images/home/Ellipse 17.png" alt="" />
                                        <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                    </div>
                                    <NftCardTitle >Connect your wallet</NftCardTitle>
                                    <NftCardContent>After You've Setup A Compatible Wallet,
                                        Connect To Shakeoint By Trading The Connect
                                        Wallet Button On The Top Right Corner.
                                    </NftCardContent>
                                </NftSellCard>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NFT;