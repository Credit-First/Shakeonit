import React from "react";
import styled from "styled-components";

const Header = styled.div`
    @media only screen and (max-width : 1199px) {        
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 140%;
        /* identical to box height, or 34px */

        text-align: justify;

        color: #38435E;

        padding-bottom: 24px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 140%;
        /* identical to box height, or 56px */

        text-align: justify;

        color: #38435E;

        padding-bottom: 40px;
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

        padding-top: 20px;
        padding-bottom: 12px;
    }
    @media only screen and (min-width : 1200px) {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 100%;
        /* identical to box height, or 24px */

        text-align: justify;
        text-transform: capitalize;

        color: #38435E;

        padding-bottom: 16px;
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

    }
`
const Card = styled.div`
    @media only screen and (max-width : 1023px) {
        padding-bottom: 80px;
        padding-top: 4px;
    }
    @media only screen and (min-width : 1024px) {
        padding-bottom: 162px;
        padding-top: 32px;
    }
`

function Explore() {
    return (
        <>
            <Header style={{display : "flex" , justifyContent : "start !important"}}>Explore Our Collections</Header>
            <div>
                <div className="grid grid-cols-1 lg:gap-6 lg:grid-cols-2">
                    <div className="flex justify-center">
                        <img className="img-radius" src="static/images/home/bakc4343.jpg" alt="" />
                    </div>
                    <div className="hidden lg:block">
                        <div>
                            <img className="ml-12 mb-4" src="static/images/home/top-ape.png" alt="" />
                        </div>
                        <div>
                            <img src="static/images/home/bottom-ape.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="pb-3 lg:pb-0 border-b-2 lg:pr-6 lg:border-r-2 lg:border-b-0 border-color">
                        <Title>Bored Ape Yacht Club</Title>
                        <Content>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </Content>
                    </div>
                    <div className="pt-3 lg:pt-0 pb-3 lg:pb-0 lg:pl-6 lg:pr-6 border-b-2 lg:border-r-2 lg:border-b-0 border-color">
                        <Title>Azuki</Title>
                        <Content>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </Content>
                    </div>
                    <div className="pt-3 lg:pt-0 lg:pl-6">
                        <Title>Moonbirds</Title>
                        <Content>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </Content>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Explore;