import { Box } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Avatar } from "@mui/material";
import { useParams } from "react-router";
import "../../../assets/scss/customize.scss";
import Styled from "@mui/material/styles/styled";
import BoxCenter from "../../../components/Box/BoxCenter";
import BoxBetween from "../../../components/Box/BoxBetween";
import RecentActivity from "./recentactivity";
import { TypographySize12, TypographySize14, TypographySize18, TypographySize32, TypographySize42 } from "../../../components/Typography/TypographySize";
import { ethers, BigNumber } from 'ethers'
import { contract, web3, contractAbi, contractAddress } from '../../../content/contractMethods'
import CancelSale from "../../../components/Modal/cancelsale";
import ChangePrice from "../../../components/Modal/changeprice";

const collections = [
    { id: "1", image: "/static/images/trade/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "/static/images/trade/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "/static/images/trade/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

const ActiveContainer = Styled(Box)({
    paddingTop: "4.5rem",
    marginBottom: "3.2rem",
    paddingLeft: "7%",
    paddingRight: "7%"
});

const ListContainer = Styled(Box)({
    // width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingBottom: "4.5rem"
});

const ListImage = Styled(Box)({
    width: "30%"
});

const ListContent = Styled(Box)({
    width: "54%",
    height: "100%"
});
const coinTypes = ["ETH", "BNB", "SOL"]

function List(props) {
    const [flag, setFlag] = useState(false);
    const location = useLocation();
    const initialpriceValue = location.state.priceValue;
    const coin = location.state.coin;
    const coinPrice = location.state.coinPrice;


    const finalOfferdatas = location.state.finalOfferdatas;
    const isflag = location.state.isflag;
    const valiatedprice = location.state.valiatedprice;
    const validatedCoinType = location.state.validatedCoinType;


    const initialPrice = initialpriceValue * coinPrice;
    const [price, setPrice] = useState(initialPrice);
    const [priceValue, setPriceValue] = useState(initialpriceValue);
    
    const { collectionId } = useParams();
    const collection = collections.filter((item) => item.id == collectionId)[0];
    const [isOpened, setOpened] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const handleFlag = () => {
        setFlag(true);
    }
    const handleChangeFlag = () => {
        setFlag(false);
    }
    const handleChangeOpen = () => {
        setOpen(!isOpen);
    }
    const handleChangeClose = () => {
        setOpen(!isOpen);
    }
    const handleOpen = () => {
        setOpened(!isOpened);
    }
    const handleClose = () => {
        setOpened(!isOpened);
    }

    // ETHERS SETUP
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum)

    const cancelOrder = async () => {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0]    // first account in MetaMask
        const signer = provider.getSigner(walletAddress)


        // ethers contract instantiation
        const shakeContract = new ethers.Contract(contractAddress, contractAbi, signer)
        // getActiveOrderLength 
        const getActiveOrderLength = shakeContract.getActiveOrderLength()
        const orderActiveSet = shakeContract.getFromActiveOrderSet([1])
        
        shakeContract.cancelOrder(BigNumber.from(orderActiveSet), {
            gasLimit: 300000
        }).then(res=>{
            console.log(res)
        })
    }

    return (
        <Box className="bg-list relative">
            <ActiveContainer>
                <TypographySize32>Active Listing</TypographySize32>
            </ActiveContainer>
            <div>
                <ListContainer className="block lg:flex justify-between">
                    <ListImage className="listImage" >
                        <img src={collection.image} className = "img" />
                    </ListImage>
                    <ListContent className="listContent">
                        <BoxBetween>
                            <BoxCenter className="p-1 sm:p-2 rounded-xl bg-white">
                                <Avatar className="ml-0 mr-3 sm:mx-3" alt="Remy Sharp" src="/static/images/cards/avatar.png" />
                                <TypographySize18 className="flex items-center px-1 sm:px-3">Steven Bartlett</TypographySize18>
                            </BoxCenter>
                            <BoxCenter className="flex items-center">
                                <TypographySize12 className="remain-btn pulse1 px-1 sm:px-2 py-2">Remaining 100/500</TypographySize12>
                            </BoxCenter>
                        </BoxBetween>
                        <Box className="" style={{ marginTop: "5%" }}>
                            <TypographySize42 style={{ marginBottom: "2.5%" }}>{collection.name}</TypographySize42>
                            <TypographySize14 style={{ marginBottom: "5%" }} className="my-3">A collection of 10000 owl-looking portraits with varying traits. The NFT gives holders access to private club memberships plus other perks</TypographySize14>
                        </Box>
                        <Box>
                            <Box className="flex">
                                <img src="/static/images/dollar-circle.png" />
                                <TypographySize14 className="flex items-center">Price:</TypographySize14>
                            </Box>
                            <Box className="flex items-center" style={{ marginTop: "4%" }}>
                                {!flag ?
                                    <TypographySize32>{price}</TypographySize32>
                                    :
                                    <TypographySize32>{initialPrice}</TypographySize32>
                                }
                                {!flag ?
                                <TypographySize14 className="pl-6">/ {priceValue} {coinTypes[coin]}</TypographySize14>
                                 : 
                                <TypographySize14 className="pl-6">/ {initialpriceValue} {coinTypes[coin]}</TypographySize14>
                                 }
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ marginTop: "12%" }}>
                            <a className="flex justify-center btn pulse1 w-full" onClick={handleChangeOpen}>Change Price</a>
                            <a className="flex justify-center outlined-btn connect-btn pulse1 w-full" onClick={handleOpen}>Cancel Sale</a>
                        </Box>
                    </ListContent>
                </ListContainer>
                <RecentActivity finalOfferdatas = {finalOfferdatas} isflag = {isflag} valiatedprice = {valiatedprice} validatedCoinType = {validatedCoinType} />
                <CancelSale open={isOpened} onClose={handleClose} image={collection.image} />
                <ChangePrice open={isOpen} onClose={handleChangeClose} image={collection.image} setPrice={setPrice} price={price} setPriceValue={setPriceValue} coinPrice={coinPrice} handleFlag={handleFlag} handleChangeFlag={handleChangeFlag} />
            </div>
        </Box>
    );
}

export default List;