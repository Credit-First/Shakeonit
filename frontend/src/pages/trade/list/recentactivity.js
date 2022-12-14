import React, { useState, useEffect } from "react";
import { TypographySize18, TypographySize20 } from "../../../components/Typography/TypographySize";
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { contractAbi, contractAddress } from '../../../content/contractMethods'
import { ethers, BigNumber } from 'ethers'
import BuyerChat from '../../client/chat'
import { Toaster } from 'react-hot-toast';
import { Box } from "@mui/material";
import { useParams } from "react-router";
import { getAllRequests } from '../../../store/apis';

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
const RequestCad = styled.div`
    position: relative;
    margin-top: -30px;
    margin-left: 15px;
`
const username = localStorage.getItem("username");

function RecentActivity() {
    const { finalOfferdatas, isflag, valiatedprice, validatedCoinType, contractAddress, tokenId } = useParams();
    const [isOpenedChat, setOpenedChat] = useState(false);
    const [requests, setRequests] = useState();
    const [request_flag, setRequestFlag] = useState(false);
    const closechat = () => {
        document.getElementById("openchat").style.display = "none";
        setOpenedChat(false);
    }

    const openchat = () => {
        // if(request_flag){
            document.getElementById("openchat").style.display = "block";
            setOpenedChat(true);
        // }
    }

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
        const orderActiveSet = shakeContract.getFromActiveOrderSet([1])

        shakeContract.acceptOffer(BigNumber.from(orderActiveSet), {
            gasLimit: 300000
        }).then(res => {
            console.log(res)
        })
    }

	useEffect(() => {
        const allRequests = getAllRequests(contractAddress);
        allRequests.then((v) => {
            if(v > 0){
                setRequests(v);
                setRequestFlag(true);
                
            }else{
                setRequests(v);
                setRequestFlag(false);
            }
        }); 
	}, [requests, isOpenedChat, contractAddress, tokenId])


    return (
        <>
            <TypographySize18 className="flex justify-center">Recent Activity</TypographySize18>
            <div className="recentactivity border rounded-xl mt-6 mb-12 pt-6 pb-6 color-blue bg-white">
                <Box className="my-6">
                    <Box className="block lg:flex">
                        <Box className="w-full">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {/* {isflag ?
                                    <div style={{ width: "35%" }}>
                                        <AssetCard style={{ justifyContent: "space-between" }} className="px-1">
                                            <TypographySize20>{valiatedprice}</TypographySize20>
                                            <TypographySize20>{validatedCoinType}</TypographySize20>
                                            <img src="../static/images/client/image 20.png" alt='' />
                                        </AssetCard>
                                    </div>
                                    :
                                    <>
                                        {finalOfferdatas.map((offerdata) =>
                                            <div key={offerdata.name} style={{ width: "35%" }}>
                                                <AssetCard style={{ justifyContent: "space-between" }} className="px-2">
                                                    <TypographySize20>{offerdata.balance}</TypographySize20>
                                                    <TypographySize20>{offerdata.name}</TypographySize20>
                                                    <img src="../static/images/client/image 20.png" alt='' />
                                                </AssetCard>
                                            </div>
                                        )}
                                    </>
                                } */}
                                <div style={{ width: "25%" }}>
                                    <AssetCard style={{ justifyContent: "center" }} className="px-1">
                                        <SearchIcon style={{ color: "white" }} />
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
                                <p className="listinput text-gray-400">Somebody Wants To Buy Your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <Box onClick={() => openchat()} className="outlined-btn1 text-list-accept pulse"><span style={{'fontSize':` ${request_flag ? '18px' : ''}`, 'fontWeight':` ${request_flag ? 'bold' : ''}`, 'marginRight':` ${request_flag ? '0.5rem' : ''}`}}>Accept Chat</span>{request_flag ? '(' + requests + ')': ''}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="my-6">
                        <Box className="block lg:flex">
                            <Box className="w-full">
                                <p className="listinput text-gray-400">Somebody Wants To Buy Your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <Box className="outlined-btn1 text-list-accept pulse">Propose Chat</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
            <Toaster position="bottom-right" />
            <div style={{ position: "absolute", bottom: "22px", right: '10px', display: 'none'}} id="openchat">
                <BuyerChat username={username} contractAddress={contractAddress} tokenId={tokenId} closechat={closechat} openchat={openchat} isOpenedChat={isOpenedChat} role="seller" />
            </div>
        </>
    );
}

export default RecentActivity;