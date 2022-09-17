import React, { useState } from "react";
import { TypographySize18, TypographySize20 } from "../../../components/Typography/TypographySize";
import { Container, Box, Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { contract, web3, contractAbi, contractAddress } from '../../../content/contractMethods'
import { ethers } from 'ethers'

const AssetCard = styled.div`
    display: flex;
    width: 100%;
    height : 50px;
    margin-right : 10px;
    margin-top : 10px;
    margin-bottom : 10px;
    align-items : center;
    background: #E3E3E3;
    @media only screen and (max-width: 1000px) {
        width : 100%;
        margin-right : 0px;
    }
`

function RecentActivity({ finalOfferdatas, isflag, valiatedprice, validatedCoinType }) {
    console.log(finalOfferdatas, "finalOfferdatas");
    console.log(isflag, "isflag");
    console.log(valiatedprice, "valiatedprice");
    console.log(validatedCoinType, "validatedCoinType");

    const [showFlag, setShowFlag] = useState(false);

    // ETHERS SETUP
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum)

    const acceptTradeOffer = async () => {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0]    // first account in MetaMask
        const signer = provider.getSigner(walletAddress)


        // ethers contract instantiation
        const shakeContract = new ethers.Contract(contractAddress, contractAbi, signer)
        // getActiveOrderLength 
        const orderActiveSet = shakeContract.getFromActiveOrderSet([1])
    
        await shakeContract.acceptOffer(ethers.BigNumber.from([orderActiveSet[1]]), {
            gasLimit: 250000
        })
    }

    return (
        <>
            <TypographySize18 className="flex justify-center">Recent Activity</TypographySize18>
            <div className="recentactivity border rounded-xl mt-6 mb-12 pt-6 pb-6 color-blue bg-white">
                <Box className="my-6">
                    <Box className="block lg:flex">
                        <Box className="w-full">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {isflag ?
                                    <div style={{ width: "35%" }}>
                                        <AssetCard style={{ justifyContent: "space-between" }} className="px-1">
                                            <TypographySize20>{valiatedprice}</TypographySize20>
                                            <TypographySize20>{validatedCoinType}</TypographySize20>
                                            <img src="../static/images/client/image 20.png" />
                                        </AssetCard>
                                    </div>
                                    :
                                    <>
                                        {finalOfferdatas.map((offerdata) =>
                                            <div key={offerdata.name} style={{ width: "35%" }}>
                                                <AssetCard style={{ justifyContent: "space-between" }} className="px-2">
                                                    <TypographySize20>{offerdata.balance}</TypographySize20>
                                                    <TypographySize20>{offerdata.name}</TypographySize20>
                                                    <img src="../static/images/client/image 20.png" />
                                                </AssetCard>
                                            </div>
                                        )}
                                    </>
                                }
                                <div style={{ width: "25%" }}>
                                    <AssetCard style={{ justifyContent: "center" }} className="px-1">
                                        <SearchIcon style={{color : "white"}} />
                                    </AssetCard>
                                </div>
                            </div>
                        </Box>
                        <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center items-center">
                        <Box onClick={acceptTradeOffer} className="outlined-btn1 text-list-accept pulse">Accept Offer</Box>
                        </Box>
                    </Box>
                    <Box className="my-6" >
                        <Box className="block lg:flex">
                            <Box className="w-full">
                                <p className="listinput text-gray-400">Somebody wants to buy your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <Box onClick={() => setShowFlag(!showFlag)} className="outlined-btn1 text-list-accept pulse">Accept Chat</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="my-6">
                        <Box className="block lg:flex">
                            <Box className="w-full">
                                <p className="listinput text-gray-400">Somebody wants to buy your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <Box className="outlined-btn1 text-list-accept pulse">Propose Chat</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
            {!showFlag ? '' :
                <Box className="absolute rounded-xl message bg-gray-100">
                    <Box className="rounded-xl text-white user-bg relative">
                        <Box className="text-2xl font-medium px-12 py-3">
                            Jordan Powell
                        </Box>
                        <Box className="flex pl-4 pr-16  py-3">
                            <Avatar className="mx-3">
                                {"J"}
                            </Avatar>
                            <Box className="text-white">Hello sofia, how can we help you</Box>
                        </Box>
                    </Box>
                    <Box style={{ display: "block" }} className="px-5">
                        <Box className="sms-y my-3">
                            <p className="rounded-xl m-you px-2 text-white">Hello</p>
                        </Box>
                        <Box className="sms-o my-3" style={{ width: "50%" }}>
                            <p className="rounded-xl m-other px-2">Hello Sofia, how can we help you?</p>
                        </Box>
                        <Box className="sms-y my-3">
                            <p className="rounded-xl m-you px-2 text-white">Lorem Ipsum</p>
                        </Box>
                        <Box className="sms-o my-3">
                            <p className="rounded-xl m-other px-2">Lorem Ipsum</p>
                        </Box>
                    </Box>
                    <Box className="flex justify-between px-4 rounded-xl bg-white py-3">
                        <Box>
                            <input placeholder="type here..."></input>
                        </Box>
                        <Box className="block md:flex">
                            <Box>
                                <img src="/static/images/send-2.png" />
                            </Box>
                            <Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="absolute" style={{ left: "-60px" }} onClick={() => setShowFlag(false)}><img src="/static/images/arrow-circle-down.png" /></Box>
                </Box>
            }
        </>
    );
}

export default RecentActivity;