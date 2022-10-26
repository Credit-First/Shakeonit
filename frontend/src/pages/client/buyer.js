import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { useLocation, useParams } from "react-router";
import "../../assets/scss/customize.scss";
import Styled from "@mui/material/styles/styled";
import BoxCenter from "../../components/Box/BoxCenter";
import BoxBetween from "../../components/Box/BoxBetween";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { coinTypes } from "../../content/config";
import { validatedTokens } from "../../content/config";
import CloseIcon from '@mui/icons-material/Close';
import { TypographySize12, TypographySize14, TypographySize18, TypographySize20, TypographySize32, TypographySize42 } from "../../components/Typography/TypographySize";
import Web3 from 'web3'
import { ethers } from 'ethers'
import { contract, web3, orderActiveSet, orderListLength, contractAbi, contractAddress } from '../../content/contractMethods'
import { v4 as uuid } from 'uuid';
import Modal from "../../components/Modal/modal";
import { useWeb3React } from "@web3-react/core";
import NftContext from '../../context/nftContext';
import Config from '../../config/app';
import BuyerChat from './chat';
import { Toaster } from 'react-hot-toast';
import { simplifyAccount } from '../global';
import TokenContext from '../../context/tokenContext';
import { httpGet } from "../../utils/http.utils";
import CancelSale from "../../components/Modal/cancelsale";
import ChangePrice from "../../components/Modal/changeprice";

const Container = styled.div`
    width: 100%;

    @media only screen and (max-width: 1000px) {
        width : 100%;
    }
`

const AssetCard = styled.a`
    display: flex;
    width: 100%;
    height : 50px;
    margin-right : 10px;
    margin-bottom : 20px;
    align-items : center;

    @media only screen and (max-width: 1000px) {
        width : 100%;
        margin-right : 0px;
    }
`
const CounterCard = styled.div`
    display : flex;
    width : 80%;
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

const ActiveContainer = Styled(Box)({
	paddingTop: "4.5rem",
	marginBottom: "3.2rem",
	paddingLeft: "7%",
	paddingRight: "7%"
});

const ListContainer = Styled(Box)({
	width: "100%",
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

const username = localStorage.getItem("username");

function Buyer() {
	const nftCtx = useContext(NftContext);
	const tokenCtx = useContext(TokenContext);
	const { account } = useWeb3React();
	const { nonce } = useParams();
	const { address, tokenId } = useParams();
	const [nftDetail, setNftDetail] = useState({});
	const [collections, setCollections] = useState([]);
	const [selectedCollectionAddress, setSelectedCollectionAddress] = useState('');
	const [collectionItems, setCollectionItems] = useState([]);

	const location = useLocation();
	const [initialpriceValue, setInitialpriceValue] = useState(0);
	const [coin, setCoin] = useState(0);
	const [coinType, setCoinType] = useState(0);
	const [coinPrice, setCoinPrice] = useState(0);

	let uniqueId = "";

	const [OtherAction, setOtherAction] = useState("");
	const [isOpenedChat, setOpenedChat] = useState(false);
	const [offerdatas, setOfferData] = useState({
		tokens: [], nfts: []
	});
	const [finalOfferdatas, setFinalOfferdatas] = useState({
		tokens: [], nfts: []
	});
	const [totalprice, setTotalPrice] = useState(0);
	const [content, setContent] = useState("");
	const [isOpen, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}

	const initialPrice = initialpriceValue * coinPrice;
	const [modalPrice, setModalPrice] = useState(initialPrice);
	const [modalPriceValue, setModalPriceValue] = useState(initialpriceValue);
	const [modalflag, setModalFlag] = useState(false);
	const [isModalOpened, setModalOpened] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);

	const handleModalFlag = () => {
		setModalFlag(true);
	}
	const handleChangeFlag = async () => {
		setModalFlag(false);

		const ethereum = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum)

        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0]    // first account in MetaMask
        const signer = provider.getSigner(walletAddress)

        // ethers contract instantiation
        const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)
        // getActiveOrderLength 

        await shakeContract.updateOrder(nonce, '0x0000000000000000000000000000000000000000', '1000000000000', {
            gasLimit: 250000
        }).then(res => {
            console.log(res)
        })
	}
	const handleModalChangeOpen = () => {
		setModalOpen(!isModalOpen);
	}
	const handleModalChangeClose = () => {
		setModalOpen(!isModalOpen);
	}
	const handleModalOpen = () => {
		setModalOpened(!isModalOpened);
	}
	const handleModalClose = () => {
		setModalOpened(!isModalOpened);
	}

	const [validatedCoinType, setValidtedCoinType] = useState(Array(validatedTokens).fill(0));
	const [validatedcoinPrice, setValidatedCoinPrice] = useState(Array(validatedTokens).fill(0))
	const [isflag, setFlag] = useState(false);
	const [searchAddress, setSearchAddress] = useState('');

	const handlevalidatedCoinType = (event) => {
		setValidtedCoinType(event.target.value);
	}

	const [myBalances, setMyBalances] = useState([]);

	const handleSearch = () => {
		if (searchAddress.length == 42 && searchAddress.includes('0x')) {
			tokenCtx.getTokens(searchAddress);
		}
	}

	useEffect(() => {
		account && setSearchAddress(account);
	}, [account]);

	// Get the Accounts current Balance and convert to Wei and ETH
	useEffect(() => {
		handleGetBalance()
	}, [tokenCtx])


	useEffect(() => {
		if (nftCtx.nfts.length > 0) {
			getNft();
			getCollections();
		}
	}, [nftCtx, nonce, account]);

	const getGenericImageUrl = (_url) => {
		_url = _url.replace('ipfs://', 'https://ipfs.io/ipfs/')
		if (!_url.includes('/')) _url = 'https://ipfs.io/ipfs/' + _url;
		return _url
	}

	const getNft = async () => {
		const ethereum = window.ethereum;

		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const walletAddress = accounts[0]    // first account in MetaMask
		const provider = new ethers.providers.Web3Provider(ethereum)
		const signer = provider.getSigner(walletAddress)

		const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)

		const shakeItem = await shakeContract.getFromActiveOrderSet(nonce);

		const nftContract = new ethers.Contract(shakeItem.give, Config.nftContract.abi, signer)

		const tokenURI = await nftContract.tokenURI(Number(shakeItem.amountGiveOrTokenID));

		const { image, name } = await httpGet(getGenericImageUrl(tokenURI));

		setNftDetail({
			give: shakeItem.give,
			amountGiveOrTokenID: shakeItem.amountGiveOrTokenID,
			image: getGenericImageUrl(image),
			name: name,
			owner: shakeItem.owner,
			amountGetOrTokenID: shakeItem.amountGetOrTokenID
		});
	}

	const getCollections = useCallback(
		() => {
			setCollections(nftCtx.collections);
		},
		[nftCtx.collections]
	)

	const handleViewCollaction = (collection_address) => {
		const nfts = nftCtx.nfts.filter(nft => nft.contract_address === collection_address);

		setSelectedCollectionAddress(collection_address);
		setCollectionItems(nfts);
	}

	const getWeiToInt = (balance) => {
		const wei = parseInt(balance || 0, 10)
		const eth = Math.round((wei / Math.pow(10, 18)) * 10000) === 0 ? (wei / Math.pow(10, 18)) * 10000 : Math.round((wei / Math.pow(10, 18)) * 10000)// parse to ETH
		const ceth = parseFloat(eth / 10000);
		return ceth;
	}

	const getIntToWei = (balance) => {
		const ceth = balance * Math.pow(10, 18);
		return ceth;
	}

	const handleGetBalance = () => {
		setMyBalances([]);

		if (tokenCtx.native.balance) {
			const obj = {
				id: 0,
				balance: parseInt(tokenCtx.native.balance),
				decimals: 18,
				symbol: "Ethereum mainnet",
				name: "ETH",
				contract_address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
				chain: '0x1'
			}
			setMyBalances(myBalances => ([...myBalances, obj]));
		}


		tokenCtx.custom.map((_token, index) => {
			const obj = {
				id: index + 1,
				balance: parseInt(_token.value),
				decimals: _token.token.decimals,
				symbol: _token.token.name,
				name: _token.token.symbol,
				contract_address: _token.token.contractAddress,
				chain: _token.token.chain
			}
			setMyBalances(myBalances => ([...myBalances, obj]));
		})
	}
	const re = /^[0-9.\b]+$/;
	const handleChange = (event, name, chain) => {
		console.log('value', event.target.value)
		const balance = chain === '0x1' ? getIntToWei(event.target.value) : event.target.value;

		if (re.test(event.target.value) && (parseInt(balance) <= parseInt(myBalances.filter((item) => item.name == name)[0].balance))) {
			setFinalOfferdatas(state => ({
				...state,
				tokens: finalOfferdatas.tokens.map((item) => {
					console.log(balance)
					if (item.name === event.target.name) {
						return { ...item, balance }
					} else {
						return item
					}
				})
			}))
		}
		else if (!re.test(event.target.value)) {
			setOpen(true);
			setContent("Please input only number!");
		}
		else if ((parseInt(event.target.value) > parseInt(myBalances.filter((item) => item.name == name)[0].balance))) {
			setOpen(true);
			setContent("Please input less value than your balance!")
		}
	}

	const onChange = (event) => {
		setOtherAction(event.target.value);
	};

	useEffect(() => {
		switch (OtherAction) {
			case "counteroffer":
				document.getElementById("counteroffer").style.display = "block";
				break;
			case "openchat":
				openchat();
				break;
			case "initiatecall":
				window.open(`/#/jitsi/room${nftDetail.give}/${username}`);
				break;

		}
	}, [OtherAction]);

	useEffect(() => {
		setTotalPrice(0);
		let total = 0;
		finalOfferdatas.tokens.map((finalofferdata) => {
			const coinType = coinTypes.find((item) => item.name == finalofferdata.name);
			const balance = finalofferdata.chain === '0x1' ? getWeiToInt(finalofferdata.balance) : finalofferdata.balance;
			total += parseFloat(balance * (CoinTypesPrice[coinType.id - 1] || 0));
		});
		setTotalPrice(total.toFixed(4));
	}, [finalOfferdatas.tokens])

	const handleRemoveOffer = (type = 'token', id, address) => {
		if (type === 'token') {
			setOfferData(state => ({
				...state,
				tokens: offerdatas.tokens.filter(item => item.id !== id)
			}));
			setFinalOfferdatas(state => ({
				...state,
				tokens: finalOfferdatas.tokens.filter(item => item.id !== id)
			}));
		} else {
			setOfferData(state => ({
				...state,
				nfts: offerdatas.nfts.filter(item => !(item.tokenId === id && item.contract_address === address))
			}));
			setFinalOfferdatas(state => ({
				...state,
				nfts: finalOfferdatas.nfts.filter(item => !(item.tokenId === id && item.contract_address === address))
			}));
		}
	}

	const closechat = () => {
		document.getElementById("openchat").style.display = "none";
		setOpenedChat(false);
	}

    const openchat = () => {
        if (sessionStorage.getItem("active") === "true") {
            document.getElementById("openchat").style.display = "block";
            setOpenedChat(true);
        }
    }


	//mybalance CoinType
	const [myBalancePrice, setMyBalancePrice] = useState(Array(myBalances).fill(0))

	useEffect(() => {
		getMybalanceCoinPrice();
		getCoinType();
	}, [myBalances])

	const getMybalanceCoinPrice = useCallback(() => {
		myBalances.forEach((item, index) => {
			if (item.name === 'shake' || item.name === 'SAFE') {
				setMyBalancePrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = 0
					return tempPrice
				})
			} else {
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
					.catch(err => console.log(err))
			}
		})
	}, [myBalances])


	//CoinType

	const [CoinTypesPrice, setCoinTypesPrice] = useState(Array(myBalances).fill(0))
	const getCoinType = useCallback(
		() => {
			coinTypes.forEach((item, index) => {
				if (item.name === 'shake' || item.name === 'SAFE') {
					setCoinTypesPrice((prev) => {
						const tempPrice = [...prev]
						tempPrice[index] = 0
						return tempPrice
					})
				} else {
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
						.catch(err => console.log(err))
				}
			})
		},
		[myBalances],
	)

	//validation CoinType
	useEffect(() => {
		getCoinPrice()
	}, [])
	const getCoinPrice = useCallback(() => {
		validatedTokens.forEach((item, index) => {
			if (item.name === 'shake' || item.name === 'SAFE') {
				setValidatedCoinPrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = 0
					return tempPrice
				})
			} else {
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
					.catch(err => console.log(err))
			}
		})
	}, [validatedTokens])

	//validation balance
	const [total, setPreTotal] = useState(0);
	const [disableflag, setDisableFlag] = useState(false);
	const [flag, setIsflag] = useState(true);
	useEffect(() => {
		let pretotal = 0;
		let currentPrice = 0;
		const currentcoinType = myBalances.filter((item) => item.name == coinTypes[coin].name);
		myBalances.map((myBalance) => {
			if (validatedTokens.find((item) => item.name == myBalance.name)) {
				currentPrice = currentcoinType[0].balance;
				// setPreTotal(parseInt(pretotal) + parseInt(myBalance.balance));
				var id = parseInt(myBalance.id);
				pretotal += (parseFloat(myBalance.balance) * parseInt(myBalancePrice[id]));
			}
		})
		setPreTotal(pretotal);
		if (parseInt(total) < parseInt(initialpriceValue * coinPrice) && flag) {
			console.log(parseInt(total), parseInt(initialpriceValue * coinPrice))
			document.getElementById('changeprice').style.display = 'none';
			setDisableFlag(true);
			if (OtherAction == "counteroffer") {
				setOpen(true);
				setContent("You can't buy this NFT because your balance is less than the NFTs price!")
				setIsflag(false);
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
			setValidatedPrice(e.target.value);
			setTotalPrice(e.target.value * validatedcoinPrice[validatedCoinType]);
		}
		else if (!re.test(e.target.value)) {
			setOpen(true);
			setContent("Please input only number!")
		}
		else if (parseInt(price) > parseInt(initialpriceValue * coinPrice)) {
			setOpen(true);
			setContent("Please input less value than your balance!")
		}
	}

	//drag and drop

	const onDragStart = (ev, type = 'token', id, address = '') => {
		ev.dataTransfer.setData("id", id);
		ev.dataTransfer.setData("type", type);
		ev.dataTransfer.setData("address", address);
	}

	const onDragOver = (ev) => {
		ev.preventDefault();
	}

	const onDrop = (ev) => {
		let id = ev.dataTransfer.getData("id");
		let type = ev.dataTransfer.getData("type");
		let address = ev.dataTransfer.getData("address");
		if (type === 'token') {
			const myBalance = myBalances.filter((item) => item.name == id);
			const newOfferData = [...offerdatas.tokens, myBalance];
			setOfferData(state => ({ ...state, tokens: newOfferData }));
			if (validatedTokens.find((item) => item.name == id)) {
				if (!finalOfferdatas.tokens.find(item => item.name == id)) {
					const newFinalOfferData = [...finalOfferdatas.tokens, ...myBalance];
					setFinalOfferdatas(state => ({ ...state, tokens: newFinalOfferData }));
				}
			}
		} else {
			const myNft = nftCtx.nfts.filter(nft => nft.tokenId === id && nft.contract_address === address);
			const newOfferData = [...offerdatas.nfts, myNft];
			setOfferData(state => ({ ...state, nfts: newOfferData }));
			if (!finalOfferdatas.nfts.find(nft => nft.tokenId == id && nft.contract_address === address)) {
				const newFinalOfferData = [...finalOfferdatas.nfts, ...myNft];
				setFinalOfferdatas(state => ({ ...state, nfts: newFinalOfferData }));
			}
		}
	}

	// ETHERS SETUP
	const ethereum = window.ethereum;
	const provider = new ethers.providers.Web3Provider(ethereum)

	// WRITE OPERATIONS
	const makeCounterOffer = async () => {
		// let w3 = new Web3(window.web3.currentProvider)
		// const acct = await w3.eth.getAccounts[0]
		uniqueId = uuid();
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const walletAddress = accounts[0]    // first account in MetaMask
		const signer = provider.getSigner(walletAddress)

		// ethers contract instantiation
		const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)

		let filterCoinTypes = []
		let givesTokenAddress = []
		let amountOrTokenIds = []
		let addressTypes = [];
		let flags = 0;

		finalOfferdatas.tokens.map(function (i) {
			filterCoinTypes.push(coinTypes.filter((el) => el.name == i.name))
			amountOrTokenIds.push(i.balance)
			addressTypes.push('token')
		})

		filterCoinTypes.map(function (e) {
			givesTokenAddress.push(e[0].address)
		})

		finalOfferdatas.nfts.map(function (i) {
			amountOrTokenIds.push(i.tokenId)
			givesTokenAddress.push(i.contract_address)
			addressTypes.push('nft')
		})
		/// @notice Make a counter offer and transfor the array of tokens into internal nft (if needed)
		/// @dev ShakeOnIt DAO
		/// @param refNonce Order ID
		/// @param gives Token Addresses (fungible and non-fungible)
		/// @param amountOrTokenIds Amounts (fungible) of TokenIDs (non-fungible)

		const processCallback = () => {
			if (flag < givesTokenAddress.length) return
			shakeContract.makeOfferFromOrder(1, givesTokenAddress, amountOrTokenIds, {
				value: Number(nftDetail.amountGetOrTokenID),
				gasLimit: 300000,
			}).then(res => {
				console.log(res)
			})
		}

		for (let i = 0; i < givesTokenAddress.length; i++) {
			const address = givesTokenAddress[i];
			if (addressTypes[i] === 'token') {
				const tokenContract = new ethers.Contract(address, Config.tokenContract.abi, signer)
				await tokenContract.approve(Config.shakeonit.address, amountOrTokenIds[i]);

				tokenContract.on('Approval', (owner, spender, value) => {
					if (owner === account && value === amountOrTokenIds[i]) {
						flag++;
						processCallback();
					}
				})
			} else {
				const nftContract = new ethers.Contract(address, Config.nftContract.abi, signer)
				await nftContract.approve(Config.shakeonit.address, amountOrTokenIds[i]);

				nftContract.on('Approval', (owner, approved, tokenId) => {
					if (owner === account && tokenId === amountOrTokenIds[i]) {
						flag++;
						processCallback();
					}
				})
			}


		}

	}

	const buyOrder = async () => {
		setIsflag(true);
		if (parseInt(total) < parseInt(initialpriceValue * coinPrice) && flag) {
			setOpen(true);
			setContent("You can't buy this NFT because your balance is less than the NFTs price!")
			setIsflag(false);
		}
		else if (parseInt(total) >= parseInt(initialpriceValue * coinPrice)) {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			const walletAddress = accounts[0]    // first account in MetaMask
			const signer = provider.getSigner(walletAddress)

			// ethers contract instantiation
			const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)
			// getActiveOrderLength 
			const orderActiveSet = await shakeContract.getFromActiveOrderSet(nonce)

			/// @notice Buy Few Orders at once. Anyone can execute this action
			/// @dev If at lesat one order is possible then transaction will be successful
			/// @param nonce - Array - Unique identifier of the order (always incremental)
			shakeContract.buyOrders([...orderActiveSet], {
				gasLimit: 300000
			}).then(res => {
				console.log(res)
			})
		}
	}

	//send datas
	const pricedata = {
		coin: coin,
		coinPrice: coinPrice,
		priceValue: initialpriceValue,
		coinType: coinType,
		//after connecting backend
		uniqueId: uniqueId,
		finalOfferdatas: finalOfferdatas,
		isflag: isflag,
		valiatedprice: valiatedprice,
		validatedCoinType: validatedCoinType
	}

	return (
		<Box className="bg-list relative">
			<ActiveContainer>
				<TypographySize32>Active Listing</TypographySize32>
			</ActiveContainer>
			<div>
				<ListContainer className="block lg:flex justify-between">
					<ListImage className="listImage" >
						{nftDetail.image && <img src={nftDetail.image} className="img" />}
					</ListImage>
					<ListContent className="listContent">
						<BoxBetween>
							<BoxCenter className=" px-2 py-2 rounded-xl bg-white">
								<Avatar className="" alt="Remy Sharp" src="/static/images/cards/avatar.png" />
								<TypographySize18 className="flex items-center pl-3">Steven Bartlett</TypographySize18>
							</BoxCenter>
							<BoxCenter className="flex items-center">
								<TypographySize12 className="remain-btn pulse1 px-1 sm:px-2 py-2">Remaining 100/500</TypographySize12>
							</BoxCenter>
						</BoxBetween>
						<Box className="" style={{ marginTop: "5%" }}>
							<TypographySize42 style={{ marginBottom: "2.5%" }}>{nftDetail.contract_name} - {nftDetail.name}</TypographySize42>
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
						{
							nftDetail.owner === account ?
								<>
									<Box>
										<Box className="flex">
											<img src="/static/images/dollar-circle.png" alt='' />
											<TypographySize14 className="flex items-center">Price:</TypographySize14>
										</Box>
										<Box className="flex items-center" style={{ marginTop: "4%" }}>
											{!modalflag ?
												<TypographySize32>{modalPrice}</TypographySize32>
												:
												<TypographySize32>{initialPrice}</TypographySize32>
											}
											{!modalflag ?
												<TypographySize14 className="pl-6">/ {modalPriceValue}</TypographySize14>
												:
												<TypographySize14 className="pl-6">/ {initialpriceValue}</TypographySize14>
											}
										</Box>
									</Box>
									<Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ marginTop: "12%" }}>
										<div className="cursor-pointer flex justify-center btn pulse1 w-full" onClick={handleModalChangeOpen}>Change Price</div>
										<div className="cursor-pointer flex justify-center outlined-btn connect-btn pulse1 w-full" onClick={handleModalOpen}>Cancel Sale</div>
									</Box>
								</>
								:
								<Box className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ marginTop: "12%" }}>
									<a className="flex justify-center btn pulse1 w-full" onClick={buyOrder}>Buy</a>
									<Box className="outlined-btn px-3">
										<select className="w-full bg-transparent" onChange={onChange} style={{ outline: "none" }} value={OtherAction}>
											<option value="otheractions" >Other Actions</option>
											<option value="counteroffer">Counter Offer</option>
											<option value="openchat">Open a chat</option>
											<option value="initiatecall">Initiate a Call</option>
										</select>
									</Box>
								</Box>
						}
					</ListContent>
				</ListContainer>
				<ListContainer id="counteroffer" style={{ display: "none" }}>
					<TypographySize20>Your assets</TypographySize20>
					<div className="flex items-center justify-start">
						<div className="flex">
							<input className="w-[400px] border border-gray-800 rounded-l-xl py-2 px-3 focus:outline-none focus-visible:outline-none"
								value={searchAddress}
								onChange={(e) => setSearchAddress(e.target.value)} />
							<a className='btn px-6 py-3 pulse rounded-l-none text-xl' onClick={handleSearch}>Search</a>
						</div>
					</div>
					<Container>
						<div className="grid grid-cols-3 gap-4 pt-6">
							<div className="flex flex-col gap-y-2">
								{myBalances.map((myBalance, index) => {
									const id = myBalance.id;
									let offerdata = finalOfferdatas.tokens.find(item => item.id === id);
									let validatedToken = validatedTokens.find(item => item.name === myBalance.name);
									let className = !disableflag ? "asset" : "asset-disable";
									let balance = parseFloat(!offerdata ? myBalance.balance : (myBalance.balance - offerdata.balance));
									let display_balance = parseFloat(myBalance.chain === '0x1' ? getWeiToInt(balance) : balance)
									return (
										<AssetCard
											draggable
											onDragStart={(e) => onDragStart(e, 'token', myBalance.name)}
											key={index}
											className={className}
											style={{ width: '100%', position: 'relative' }}
										>
											<div className="flex-1 flex items-center">
												<img src="../static/images/client/image 14.png" />
												<div className="w-full flex items-center justify-around">
													<div className="w-1/2 px-5">
														<TypographySize20 style={{ textAlign: 'right' }}>{display_balance}</TypographySize20>
													</div>
													<div className="w-1/2 px-5">
														<TypographySize20 className="truncate w-[200px]">{myBalance.name}</TypographySize20>
													</div>
												</div>
											</div>
											<div className="absolute right-5 inset-y-0 flex items-center">
												{!validatedToken ?
													<img id={"error-img" + myBalance.name} />
													:
													<img id={"success-img" + myBalance.name} src="../static/images/client/image 20.png" />
												}
											</div>
										</AssetCard>
									)
								})}
							</div>
							<div className="flex flex-col gap-y-2">
								{
									collections.map((collection, index) => (
										<AssetCard key={index} className="asset" style={{ ...(collection.address === selectedCollectionAddress) && { backgroundColor: 'grey' } }}
											onClick={() => handleViewCollaction(collection.address)}>
											{/* <img src="../static/images/client/image 14.png" /> */}
											<img className="ml-4" src={collection.image} style={{ height: "100%", width: "auto" }} />
											<TypographySize20 className="px-4 flex-1">{collection.name}</TypographySize20>
											<div>
												<svg className="z-10 cursor-pointer mr-4 hover:fill-blue-700" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" /> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" /> </svg>
											</div>
										</AssetCard>
									))
								}
							</div>
							<div className="flex flex-col gap-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar">
								{
									collectionItems.length === 0 &&
									<div className="text-center">No items</div>
								}
								{
									collectionItems.map((nft, index) => (
										<AssetCard
											draggable
											onDragStart={(e) => onDragStart(e, 'nft', nft.tokenId, nft.contract_address)}
											key={index}
											className="asset"
										>
											<img src="../static/images/client/image 14.png" />
											<img className="ml-4" src={nft.image} style={{ height: "100%", width: "auto" }} />
											<TypographySize20 className="px-4 flex-1">{nft.name}</TypographySize20>
										</AssetCard>
									))
								}
							</div>
						</div>
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
							<div className="flex items-start w-full h-full">
								<div className="w-full h-full overflow-y-auto custom-scrollbar">
									{finalOfferdatas.tokens.map((offerdata, index) =>
										<CounterCard key={index} style={{ justifyContent: "space-between" }}>
											<div>
												<TypographySize20>
													<input className="mx-2 py-2" style={{ width: "220px" }} name={offerdata.name} onChange={(e) => handleChange(e, offerdata.name, offerdata.chain)}
														value={offerdata.chain === '0x1' ? getWeiToInt(offerdata.balance) : offerdata.balance} />
												</TypographySize20>
											</div>
											<TypographySize20 className="truncate">{offerdata.name}</TypographySize20>
											<CloseIcon className='mr-2' onClick={(e) => handleRemoveOffer('token', offerdata.id, offerdata.contract_address)} />
										</CounterCard>
									)}
								</div>
								<div className="w-full h-full overflow-y-auto custom-scrollbar">
									{finalOfferdatas.nfts.map((offerdata, index) =>
										<CounterCard key={index} className="asset">
											<img className="ml-4" src={offerdata.image} style={{ height: "100%", width: "auto" }} />
											<TypographySize20 className="px-4 flex-1">{offerdata.name}</TypographySize20>
											<div>
												<CloseIcon className='mr-2' onClick={(e) => handleRemoveOffer('nft', offerdata.tokenId, offerdata.contract_address)} />
											</div>
										</CounterCard>
									)}
								</div>
							</div>
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
									to={{
										pathname: `/list/${address}/${tokenId}`,
									}}
									state={pricedata}
									style={{ width: "86%" }}
									// onClick={makeCounterOffer}
								>
									Make Offer
								</Link>
							</OfferButton>
						</div>
					</div>
				</ListContainer>
			</div>
			<div style={{ position: "absolute", bottom: "70px", right: '10px', display: 'none' }} id="openchat">
				<BuyerChat roomname={"room" + nftDetail.give} username={username} collectionID={address} closechat={closechat} openchat={openchat} isOpenedChat={isOpenedChat} role="buyer" />
			</div>
			<Toaster position="bottom-right" />
			<Modal open={isOpen} onClose={handleClose} img={nftDetail.image} content={content} />

			<CancelSale open={isModalOpened} onClose={handleModalClose} image={nftDetail.image} nonce={nonce}/>
			<ChangePrice open={isModalOpen} onClose={handleModalChangeClose} image={nftDetail.image} setPrice={setModalPrice} price={modalPrice} setPriceValue={setModalPriceValue} coinPrice={coinPrice} handleFlag={handleModalFlag} handleChangeFlag={handleChangeFlag} />
		</Box >
	);
}

export default Buyer;