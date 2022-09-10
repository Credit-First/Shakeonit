import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { useLocation, useParams } from "react-router";
import "../../assets/scss/customize.scss";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Styled from "@mui/material/styles/styled";
import BoxCenter from "../../components/Box/BoxCenter";
import BoxBetween from "../../components/Box/BoxBetween";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { coinTypes, myBalances } from "../../content/config";
import { validatedTokens } from "../../content/config";
import CloseIcon from '@mui/icons-material/Close';
import { TypographySize12, TypographySize14, TypographySize18, TypographySize20, TypographySize32, TypographySize42 } from "../../components/Typography/TypographySize";
import ABI from "../../content/shakeonitABI.json";

const Container = styled.div`
    width: 70%;

    @media only screen and (max-width: 1000px) {
        width : 100%;
    }
`

const AssetCard = styled.a`
    display: flex;
    width: 100%;
    height : 50px;
    margin-right : 10px;
    margin-top : 20px;
    margin-bottom : 20px;
    align-items : center;

    @media only screen and (max-width: 1000px) {
        width : 100%;
        margin-right : 0px;
    }
`
const CounterCard = styled.div`
    display : flex;
    width : 30%;
    height : 50px;
    margin-right : 10px;
    margin-top : 10px;
    margin-bottom : 10px;
    align-items : center;
    background: #E3E3E3;
    @media only screen and (max-width: 850px) {
        width : 100%;
        margin-right : 0px;
    }
    @media only screen and (min-width: 851px) and (max-width : 1300px) {
        width : 45%;
        margin-right : 0px;
    }
`

const OfferButton = styled.div`
    color: white !important;
    background: linear-gradient(265.83deg, #98F7FF -23.13%, #10B0C7 21.83%, #14365C 93.42%);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px !important;
    width : 350px;

    @media only screen and (max-width : 700px) {
        width : 100%;
    }
    @media only screen and (min-width : 701px) and (max-width : 1300px) {
        width : 350px
    }
`

const Border = styled.div`
    width : 100%;
    height : 250px;
    border : 2px dashed gray;

`

const collections = [
    { id: "1", image: "/static/images/trade/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "/static/images/trade/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "/static/images/trade/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

const ActiveContainer = Styled(Box)({
    marginTop: "4.5rem",
    marginBottom: "3.2rem",
    paddingLeft: "7%",
    paddingRight: "7%"
});

const ListContainer = Styled(Box)({
    width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginBottom: "4.4rem"
});

const ListImage = Styled(Box)({
    width: "38%"
});

const ListContent = Styled(Box)({
    width: "54%",
    height: "100%"
});




function Buyer(Id) {
    const contractAbi = ABI;
    const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
    
    const { collectionId } = useParams();

    const collection = collections.filter((item) => item.id == collectionId)[0];

    const location = useLocation();
    const initialpriceValue = location.state.priceValue;
    const coin = location.state.coin;
    // console.log(coin, "coin");
    const coinPrice = location.state.coinPrice;
    const coinType = location.state.coinType;
    // console.log(location.state.coinType, "!!!!");

    const [OtherAction, setOtherAction] = useState("");
    const [offerdatas, setOfferData] = useState([]);
    const [finalOfferdatas, setFinalOfferdatas] = useState([]);
    const [totalprice, setTotalPrice] = useState(0);

    const [validatedCoinType, setValidtedCoinType] = useState(Array(validatedTokens).fill(0));
    const [validatedcoinPrice, setValidatedCoinPrice] = useState(Array(validatedTokens).fill(0))
    const [isflag, setFlag] = useState(false);
    const handlevalidatedCoinType = (event) => {
        setValidtedCoinType(event.target.value);
    }


    const re = /^[0-9.\b]+$/;
    const handleChange = (event, name) => {
        if (re.test(event.target.value) && (parseInt(event.target.value) <= parseInt(myBalances.filter((item) => item.name == name)[0].balance))) {
            setFinalOfferdatas(
                finalOfferdatas.map((item) =>
                    item.name === event.target.name
                        ? { ...item, balance: event.target.value }
                        : { ...item }
                )
            );
        }
        else if (!re.test(event.target.value)) {
            alert("Please input only number!")
        }
        else if ((parseInt(event.target.value) > parseInt(myBalances.filter((item) => item.name == name)[0].balance))) {
            alert("Please input less value than your balance!")
        }
    }

    const onChange = (event) => {
        setOtherAction(event.target.value);
    };

    useEffect(() => {

        if (OtherAction == "counteroffer") {
            document.getElementById("counteroffer").style.display = "block";
        }
        else if (OtherAction == "openchat") {
            document.getElementById("openchat").style.display = "block";
        }
    }, [OtherAction]);

    useEffect(() => {
        setTotalPrice(0);
        let total = 0;
        finalOfferdatas.map((finalofferdata) => {
            const coinType = coinTypes.find((item) => item.name == finalofferdata.name);
            total += parseFloat(finalofferdata.balance * CoinTypesPrice[coinType.id - 1]);
        });
        setTotalPrice(total);
    }, [finalOfferdatas])
    const handleRemoveOffer = (id) => {
        setOfferData(offerdatas.filter(item => item.id !== id));
        setFinalOfferdatas(finalOfferdatas.filter(item => item.id !== id));
    }

    const closechat = () => {
        document.getElementById("openchat").style.display = "none";
    }


    //mybalance CoinType

    const [myBalancePrice, setMyBalancePrice] = useState(Array(myBalances).fill(0))

    React.useEffect(() => {
        getMybalanceCoinPrice()
    }, [])
    const getMybalanceCoinPrice = () => {
        myBalances.forEach((item, index) => {
            // fetch(`https://api.pancakeswap.info/api/v2/tokens/${item.address}`)
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${item.name}USDT`)
                .then(res => res.json())
                .then(res => {
                    if (res.price) {
                        setMyBalancePrice((prev) => {
                            const tempPrice = [...prev]
                            tempPrice[index] = res.price
                            return tempPrice
                        })
                    }
                })
        })
    }

    //CoinType

    const [CoinTypesPrice, setCoinTypesPrice] = useState(Array(myBalances).fill(0))

    React.useEffect(() => {
        getCoinType()
    }, [])
    const getCoinType = () => {
        myBalances.forEach((item, index) => {
            // fetch(`https://api.pancakeswap.info/api/v2/tokens/${item.address}`)
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${item.name}USDT`)
                .then(res => res.json())
                .then(res => {
                    if (res.price) {
                        setCoinTypesPrice((prev) => {
                            const tempPrice = [...prev]
                            tempPrice[index] = res.price
                            return tempPrice
                        })
                    }
                })
        })
    }

    //validation CoinType

    React.useEffect(() => {
        getCoinPrice()
    }, [])
    const getCoinPrice = () => {
        validatedTokens.forEach((item, index) => {
            // fetch(`https://api.pancakeswap.info/api/v2/tokens/${item.address}`)
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${item.name}USDT`)
                .then(res => res.json())
                .then(res => {
                    if (res.price) {
                        setValidatedCoinPrice((prev) => {
                            const tempPrice = [...prev]
                            tempPrice[index] = res.price
                            return tempPrice
                        })
                    }
                })
        })
    }

    //validation balance
    const [total, setPreTotal] = useState(0);
    const [disableflag, setDisableFlag] = useState(false);
    useEffect(() => {
        let pretotal = 0;
        let currentPrice = 0;
        const currentcoinType = myBalances.filter((item) => item.name == coinTypes[coin].name);
        myBalances.map((myBalance) => {
            if (validatedTokens.find((item) => item.name == myBalance.name)) {
                currentPrice = currentcoinType[0].balance;
                // setPreTotal(parseInt(pretotal) + parseInt(myBalance.balance));
                var id = parseInt(myBalance.id) - 1;
                pretotal += ((myBalance.balance) * (myBalancePrice[id]));
            }
        })
        setPreTotal(pretotal);
        // console.log(initialpriceValue * coinPrice, "initialpriceValue * coinPrice");
        if (parseInt(total) < parseInt(initialpriceValue * coinPrice)) {
            document.getElementById('changeprice').style.display = 'none';
            setDisableFlag(true);
            if (OtherAction == "counteroffer") {
                alert("You can't buy this NFT because your balance is less than the NFTs price!")
            }
        }
        else if (parseInt(total) > parseInt(initialpriceValue * coinPrice)) {
            if (parseInt(currentPrice) < parseInt(initialpriceValue)) {
                document.getElementById('changeprice').style.display = 'block';
                setDisableFlag(true);
            }
            else {
                document.getElementById('changeprice').style.display = 'none';
                setDisableFlag(false);
            }
            // document.getElementsByClassName('assetcard').style.pointerEvents = 'auto';
        }
    });

    //validtedTodtalPrice
    const [valiatedprice, setValidatedPrice] = useState("");
    const validatedTotalprice = (e) => {
        var price = 0;
        price = e.target.value * validatedcoinPrice[validatedCoinType];
        if (re.test(e.target.value) && parseInt(price) <= parseInt(initialpriceValue * coinPrice)) {
            setFlag(true);
            console.log(e.target.value, "e.target.value");
            setValidatedPrice(e.target.value);
            setTotalPrice(e.target.value * validatedcoinPrice[validatedCoinType]);
            console.log(price);
        }
        else if (!re.test(e.target.value)) {
            alert("Please input only number!")
        }
        else if (parseInt(price) > parseInt(initialpriceValue * coinPrice)) {
            alert("Please input less value than your balance!")
        }
    }


    //drag and drop

    const onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop = (ev) => {
        let id = ev.dataTransfer.getData("id");
        const myBalance = myBalances.filter((item) => item.name == id);
        setOfferData([...offerdatas, myBalance]);
        if (validatedTokens.find((item) => item.name == id)) {
            if (!finalOfferdatas.find(item => item.name == id)) {
                // console.log( myBalance , "get data");
                // console.log( finalOfferdatas, "finalofferdatas" );
                setFinalOfferdatas([...finalOfferdatas, ...myBalance]);
            }
        }
    }

    //send datas
    const pricedata = {
        coin : coin,
        coinPrice : coinPrice,
        priceValue : initialpriceValue,
        coinType : coinType,
        //after connecting backend
        finalOfferdatas : finalOfferdatas,
        isflag : isflag,
        valiatedprice : valiatedprice,
        validatedCoinType : validatedCoinType

    }


    return (
        <Box className="bg-list relative">
            <Header />
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
                            <BoxCenter className=" px-2 py-2 rounded-xl bg-white">
                                <Avatar className="mx-3" alt="Remy Sharp" src="/static/images/cards/avatar.png" />
                                <TypographySize18 className="flex items-center px-3">Steven Bartlett</TypographySize18>
                            </BoxCenter>
                            <BoxCenter className="flex items-center">
                                <TypographySize12 className="remain-btn pulse1 px-1 sm:px-2 py-2">Remaining 100/500</TypographySize12>
                            </BoxCenter>
                        </BoxBetween>
                        <Box className="" style={{ marginTop: "5%" }}>
                            <TypographySize42 style={{ marginBottom: "2.5%" }}>{collections.name}</TypographySize42>
                            <TypographySize14 style={{ marginBottom: "5%" }} className="my-3">A collection of 10000 owl-looking portraits with varying traits. The NFT gives holders access to private club memberships plus other perks</TypographySize14>
                        </Box>
                        <Box>
                            <Box className="flex">
                                <img src="../static/images/dollar-circle.png" />
                                <TypographySize14 className="flex items-center">Price:</TypographySize14>
                            </Box>
                            <Box className="flex items-center" style={{ marginTop: "4%" }}>
                                <TypographySize32>$ {initialpriceValue * coinPrice}</TypographySize32>
                                <TypographySize14 className="pl-6">/ {initialpriceValue} {coinTypes[coin].name}</TypographySize14>
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ marginTop: "12%" }}>
                            <a className="flex justify-center btn pulse1 w-full">Buy</a>
                            <Box className="outlined-btn px-3">
                                <select className="w-full bg-transparent" onChange={onChange} style={{ outline: "none" }} value={OtherAction}>
                                    <option value="otheractions" >Other Actions</option>
                                    <option value="counteroffer">Counter Offer</option>
                                    <option value="openchat">Open a chat</option>
                                    <option value="initiatecall">Initiate a Call</option>
                                </select>
                            </Box>
                        </Box>
                    </ListContent>
                </ListContainer>
                <ListContainer id="counteroffer" style={{ display: "none" }}>
                    <TypographySize20>Your assets</TypographySize20>
                    <Container>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                {myBalances.map((myBalance) => {
                                    const id = myBalance.id;
                                    var offerdata = finalOfferdatas.find(item => item.id == id);
                                    var validatedToken = validatedTokens.find(item => item.name == myBalance.name);
                                    var className = !disableflag ? "asset" : "asset-disable";
                                    return (
                                        <AssetCard
                                            style={{ justifyContent: "space-between" }}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, myBalance.name)}
                                            key={myBalance.id}
                                            className={className}
                                        >
                                            {!offerdata ?
                                                <>
                                                    <img src="../static/images/client/image 14.png" />
                                                    <TypographySize20 style={{ width: "50px" }}>{myBalance.balance}</TypographySize20>
                                                    <TypographySize20>{myBalance.name}</TypographySize20>
                                                    {!validatedToken ?
                                                        <img id={"error-img" + myBalance.name} src="../static/images/client/image 21.png" />
                                                        :
                                                        <img id={"success-img" + myBalance.name} src="../static/images/client/image 20.png" />
                                                    }
                                                </> : <>
                                                    <img src="../static/images/client/image 14.png" />
                                                    <TypographySize20 style={{ width: "50px" }}>{myBalance.balance - offerdata.balance}</TypographySize20>
                                                    <TypographySize20>{myBalance.name}</TypographySize20>
                                                    {!validatedToken ?
                                                        <img id={"error-img" + myBalance.name} src="../static/images/client/image 21.png" />
                                                        :
                                                        <img id={"success-img" + myBalance.name} src="../static/images/client/image 20.png" />
                                                    }
                                                </>
                                            }
                                        </AssetCard>
                                    )
                                })}
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <AssetCard className="asset" style={{ pointerEvents: "none" }}>
                                    <img src="../static/images/client/image 14.png" />
                                    <img className="ml-4" src={collection.image} style={{ height: "100%", width: "auto" }} />
                                    <TypographySize20 className="pl-4">{collection.name}</TypographySize20>
                                </AssetCard>
                            </Grid>
                        </Grid>
                    </Container>
                    <div>
                        <TypographySize20>Counter Offer</TypographySize20>
                        <Border className="relative px-3" id="addoffer" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)}>
                            <div id="changeprice" style={{ display: "none" }}>
                                <CounterCard>
                                    <TypographySize20>
                                        <input className="mx-2 py-2" style={{ width: "220px" }} onChange={validatedTotalprice} value={valiatedprice}
                                        />
                                    </TypographySize20>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={validatedCoinType}
                                        style={{ width: "100%" }}
                                        onChange={handlevalidatedCoinType}
                                    >
                                        {
                                            validatedTokens.map((item, _i) => <MenuItem value={_i} key={_i}>{item.name}</MenuItem>)
                                        }
                                    </Select>
                                </CounterCard>
                            </div>
                            {finalOfferdatas.map((offerdata) =>
                                <CounterCard key={offerdata.id} style={{ justifyContent: "space-between" }}>
                                    <div>
                                        <TypographySize20>
                                            <input className="mx-2 py-2" style={{ width: "220px" }} name={offerdata.name} onChange={(e) => handleChange(e, offerdata.name)}
                                                value={offerdata.balance} />
                                        </TypographySize20>
                                    </div>
                                    <TypographySize20>{offerdata.name}</TypographySize20>
                                    <CloseIcon onClick={(e) => handleRemoveOffer(offerdata.id)} />
                                </CounterCard>
                            )}
                        </Border>
                    </div>
                    <div className="block md:flex justify-between my-12">
                        <div className="flex">
                            <TypographySize20>Estimated Offer Value</TypographySize20>
                            <TypographySize20 className="pl-6">$ {totalprice}</TypographySize20>
                        </div>
                        <div>
                        <OfferButton className=" pulse1">
                            <Link
                                component={RouterLink}
                                underline="none"
                                color="inherit"
                                className="flex justify-center px-6"
                                // to={{
                                //     pathname: `/list/${id}`,

                                // }}
                                to={{
                                    pathname: `/list/${collectionId}`,

                                }}
                                state = {pricedata}
                                style={{ width: "86%" }}
                            >
                                Make Offer
                            </Link>
                        </OfferButton>
                        </div>
                    </div>
                </ListContainer>
            </div>
            <div style={{ position: "absolute", bottom: "330px", right: '10px' }}>
                <Box className="rounded-xl message bg-gray-100" id="openchat" style={{ display: "none" }}>
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
                    <Box style={{ position: "absolute", bottom: "-60px", right: "0px" }} onClick={closechat}><img src="/static/images/arrow-circle-down.png" /></Box>
                </Box>
            </div>
            <Footer />
        </Box>
    );
}

export default Buyer;