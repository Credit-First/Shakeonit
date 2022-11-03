import { Box } from "@mui/material";
import BigNumber from 'bignumber.js';
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import styled from 'styled-components';
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
import { ethers } from 'ethers'
import { v4 as uuid } from 'uuid';
import Modal from "../../components/Modal/modal";
import { useWeb3React } from "@web3-react/core";
import NftContext from '../../context/nftContext';
import Config from '../../config/app';
import BuyerChat from './chat';
import { Toaster } from 'react-hot-toast';
import TokenContext from '../../context/tokenContext';
import { httpGet } from "../../utils/http.utils";
import CancelSale from "../../components/Modal/cancelsale";
import ChangePrice from "../../components/Modal/changeprice";

const BIG_TEN = new BigNumber(10);

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
    align-items : center;

    @media only screen and (max-width: 1000px) {
        width : 100%;
        margin-right : 0px;
    }
`
const CounterCard = styled.div`
    display : flex;
    width : auto;
    height : 50px;
    margin: 10px;
    align-items : center;
    background: #E3E3E3;
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

    @media only screen and (max-width : 767px) {
        width : 100%;
    }
	@media only screen and (min-width : 768px) and (max-width : 1023px) {
        width : 150px;
    }
	@media only screen and (min-width : 1024px) and (max-width : 1279px) {
        width : 200px;
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

	const [buyLoading, setBuyLoading] = useState(0)
	const [buySwapLoading, setBuySwapLoading] = useState(0)
	const [MakeOfferLoading, setMakeOfferLoading] = useState(0)

	const [swapTokenAddress, setSwapTokenAdress] = useState('');
	const [swapTokenAmount, setSwapTokenAmount] = useState(0);
	const [swapTokenToUSD, setSwapTokenToUSD] = useState(0);

	const getEstimateAmount = async (_swapTokenAddress) => {
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const walletAddress = accounts[0]    // first account in MetaMask
		const signer = provider.getSigner(walletAddress)

		const routerContract = new ethers.Contract(Config.RouterContract.address, Config.RouterContract.abi, signer)

		let path = [];
		if (nftDetail.get === '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd') { // bnb native coin 
			console.log(routerContract)
			path = [_swapTokenAddress, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd']
		} else {
			path = [_swapTokenAddress, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', nftDetail.get]
		}

		const estimateAmounts = await routerContract.getAmountsIn(nftDetail.amountGetOrTokenID.toString(), path)
		const estimateAmount = new BigNumber(getTokenWeiToInt(estimateAmounts[0].toString())).toString();

		myBalances.map((token, index) => {
			if (token.contract_address === _swapTokenAddress) {
				setSwapTokenToUSD(myBalancePrice[index] * estimateAmount * 1)
				setSwapTokenAmount(estimateAmount)
			}
		})
	}

	const handleSelectToken = async (e) => {
		setSwapTokenAdress(e.target.value);
		getEstimateAmount(e.target.value)
	}

	const handleSwapTokenAmount = (e) => {
		const value = e.target.value * 1;
		myBalances.map((token, index) => {
			if (token.contract_address === swapTokenAddress) {
				setSwapTokenToUSD(myBalancePrice[index] * value)
				setSwapTokenAmount(value)
			}
		})
	}

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

		let amount = 0;
		if (nftDetail.get.toString() === '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd') {
			amount = Math.round(modalPriceValue * Math.pow(10, 18))
			console.log(amount)
		} else {
			amount = ethers.utils.parseUnits(modalPriceValue.toString()).toString();
		}
		// ethers contract instantiation
		const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)
		// getActiveOrderLength 

		await shakeContract.updateOrder(nonce, nftDetail.get.toString(), amount).then(res => {
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

	/*const handleSearch = () => {
		if (searchAddress.length == 42 && searchAddress.includes('0x')) {
			tokenCtx.getTokens(searchAddress);
		}
	}*/

	useEffect(() => {
		account && setSearchAddress(account);
	}, [account]);

	// Get the Accounts current Balance and convert to Wei and ETH
	useEffect(() => {
		handleGetBalance()
	}, [tokenCtx])


	useEffect(() => {
		getNft();

		if (nftCtx.nfts.length > 0) {
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

		const coin_detail = coinTypes.find(coin => coin.address === shakeItem.get);

		setCoin((coin_detail.id - 1) || 0)

		const price = getTokenWeiToInt(shakeItem.amountGetOrTokenID.toString())

		setInitialpriceValue(price);

		setCoinType(coinTypes)

		setCoinPrice(CoinTypesPrice[coin_detail.id - 1]);

		setNftDetail({
			give: shakeItem.give,
			get: shakeItem.get,
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

	const getTokenWeiToInt = (balance) => {
		const bignumber = new BigNumber(balance);
		return bignumber.dividedBy(BIG_TEN.pow(18)).toString()
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
				balance: (getWeiToInt(tokenCtx.native.balance)),
				decimals: 18,
				symbol: "Binance Smart Chain",
				name: "BNB",
				contract_address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
				chain: '0x61'
			}
			setMyBalances(myBalances => ([...myBalances, obj]));
		}


		tokenCtx.custom.map((_token, index) => {
			const obj = {
				id: index + 1,
				balance: _token.value,
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
		const balance = chain === '0x1' ? getIntToWei(event.target.value) : event.target.value;

		if (re.test(event.target.value) && (parseInt(balance) <= parseInt(myBalances.filter((item) => item.name == name)[0].balance))) {
			setFinalOfferdatas(state => ({
				...state,
				tokens: finalOfferdatas.tokens.map((item) => {
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
			case "buyTokenWithSwap":
				document.getElementById("buyTokenWithSwap").style.visibility = "visible";
				break;
			case "counteroffer":
				document.getElementById("counteroffer").style.visibility = "visible";
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
		setTotalPrice(total.toFixed(20));
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
		document.getElementById("openchat").style.display = "block";
		setOpenedChat(true);
	}


	//mybalance CoinType
	const [myBalancePrice, setMyBalancePrice] = useState(Array(myBalances).fill(0))

	useEffect(() => {
		getMybalanceCoinPrice();
		getCoinType();
	}, [myBalances])

	const getMybalanceCoinPrice = useCallback(() => {
		myBalances.forEach((item, index) => {
			const coin = coinTypes.find(_coin => _coin.name === item.name)
			if (!coin) return
			if (item.name === 'shake coin') {
				setMyBalancePrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000000060306'
					return tempPrice
				})
			} else if (item.name === 'Shake coin') {
				setMyBalancePrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000000060306'
					return tempPrice
				})
			} else if (item.name === 'shakecoin1') {
				setMyBalancePrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000120586'
					return tempPrice
				})
			} else if (item.name === 'Shake' || item.name === 'SHAKE TOKEN') {
				setMyBalancePrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0'
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
				if (item.name === 'shake coin') {
					setCoinTypesPrice((prev) => {
						const tempPrice = [...prev]
						tempPrice[index] = '0.000000000000060306'
						return tempPrice
					})
				} else if (item.name === 'Shake coin') {
					setCoinTypesPrice((prev) => {
						const tempPrice = [...prev]
						tempPrice[index] = '0.000000000000060306'
						return tempPrice
					})
				} else if (item.name === 'shakecoin1') {
					setCoinTypesPrice((prev) => {
						const tempPrice = [...prev]
						tempPrice[index] = '0.000000000120586'
						return tempPrice
					})
				} else if (item.name === 'Shake' || item.name === 'SHAKE TOKEN') {
					setCoinTypesPrice((prev) => {
						const tempPrice = [...prev]
						tempPrice[index] = '0'
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
			const coin = coinTypes.find(_coin => _coin.name === item.name)
			if (!coin) return
			if (item.name === 'shake coin') {
				setValidatedCoinPrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000000060306'
					return tempPrice
				})
			} else if (item.name === 'Shake coin') {
				setValidatedCoinPrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000000060306'
					return tempPrice
				})
			} else if (item.name === 'shakecoin1') {
				setValidatedCoinPrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0.000000000120586'
					return tempPrice
				})
			} else if (item.name === 'Shake' || item.name === 'SHAKE TOKEN') {
				setValidatedCoinPrice((prev) => {
					const tempPrice = [...prev]
					tempPrice[index] = '0'
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
				currentPrice = currentcoinType[0]?.balance || '1000000000000000000000';
				// setPreTotal(parseInt(pretotal) + parseInt(myBalance.balance));
				var id = parseInt(myBalance.id);
				pretotal += (parseFloat(myBalance.balance) * parseInt(myBalancePrice[id]));
			}
		})
		setPreTotal(pretotal);
		if (parseInt(total) < parseInt(initialpriceValue * coinPrice) && flag) {
			document.getElementById('changeprice').style.display = 'none';
			// setDisableFlag(true);
			if (OtherAction == "counteroffer") {
				setOpen(true);
				setContent("You can't buy this NFT because your balance is less than the NFTs price!")
				setIsflag(false);
			}
		}
		else if (parseInt(total) > parseInt(initialpriceValue * coinPrice)) {
			if (parseInt(currentPrice) < parseInt(initialpriceValue)) {
				// document.getElementById('changeprice').style.display = 'block';
				// setDisableFlag(true);
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
			let amount = 0;
			if (i.contract_address === '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd') {
				amount = Math.round(i.balance * Math.pow(10, 18))
			} else {
				amount = ethers.utils.parseUnits(i.balance.toString()).toString();
			}
			amountOrTokenIds.push(amount)
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
			if (flags < givesTokenAddress.length) return
			setMakeOfferLoading(2)
			console.log(nonce, givesTokenAddress, amountOrTokenIds)
			shakeContract.makeOfferFromOrder(nonce, givesTokenAddress, amountOrTokenIds)
				.then(res => {
					console.log(res)
				})
			shakeContract.on("PlaceOrder", (give, get, amountGive, amountGet, nonce) => {
				setMakeOfferLoading(0)
			})
		}

		for (let i = 0; i < givesTokenAddress.length; i++) {
			const address = givesTokenAddress[i];
			setMakeOfferLoading(1)
			if (addressTypes[i] === 'token') {
				const tokenContract = new ethers.Contract(address, Config.tokenContract.abi, signer)

				await tokenContract.approve(Config.shakeonit.address, amountOrTokenIds[i])
				.then(() => {})
				.catch(() => setMakeOfferLoading(0));

				tokenContract.on('Approval', (owner, spender, value) => {
					if (owner === account && value.toString() === amountOrTokenIds[i].toString()) {
						flags++;
						processCallback();
					}
				})
			} else {
				const nftContract = new ethers.Contract(address, Config.nftContract.abi, signer)
				await nftContract.approve(Config.shakeonit.address, amountOrTokenIds[i])
				.then(() => {})
				.catch(() => setMakeOfferLoading(0));

				nftContract.on('Approval', (owner, approved, tokenId) => {
					if (owner === account && tokenId === amountOrTokenIds[i]) {
						flags++;
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

			/// @notice Buy Few Orders at once. Anyone can execute this action
			/// @dev If at lesat one order is possible then transaction will be successful
			/// @param nonce - Array - Unique identifier of the order (always incremental)
			const tokenContract = new ethers.Contract(nftDetail.get, Config.tokenContract.abi, signer);

			tokenContract.approve(Config.shakeonit.address, nftDetail.amountGetOrTokenID.toString())
			.then(() => {})
			.catch(() => setBuyLoading(0));

			setBuyLoading(1)

			tokenContract.on('Approval', (owner, spender, value) => {
				if (owner === account && value.toString() === nftDetail.amountGetOrTokenID.toString()) {
					setBuyLoading(0)
					shakeContract.buyOrders([...nonce])
				}
			})
		}
	}

	const handleBuyTokenWithSwap = async () => {
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const walletAddress = accounts[0]    // first account in MetaMask
		const signer = provider.getSigner(walletAddress)

		// ethers contract instantiation
		const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)
		const order = await shakeContract.getFromActiveOrderSet(nonce);

		//bsc testnet
		const routerContractAddress = Config.RouterContract.address // bsc pancakeswap router contract
		let addressList = [];
		if (order.get !== '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd' || order.get !== '0x0000000000000000000000000000000000000000') {
			addressList = [swapTokenAddress, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', order.get];
		} else {
			if (swapTokenAddress !== '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd') return alert('You can only choose ETH to swap')
			addressList = [swapTokenAddress, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'];
		}

		const tokenContract = new ethers.Contract(swapTokenAddress, Config.tokenContract.abi, signer)

		const amount = ethers.utils.parseUnits(swapTokenAmount.toString()).toString()
		tokenContract.approve(Config.shakeonit.address, amount)
		.then(() => {})
		.catch(() => setBuySwapLoading(0));

		setBuySwapLoading(1)
		tokenContract.on('Approval', (owner, spender, value) => {
			if (owner === account && Number(value) === Number(amount)) {
				setBuySwapLoading(2)
				shakeContract.buyTokenWithSwap(nonce, routerContractAddress, addressList, amount).then(res => {
					console.log(res)
				})
				shakeContract.on('BuyOrder', (nonce) => {
					setBuySwapLoading(0)
				})
			}
		})
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
				<Box className="block lg:flex justify-between w-full px-[7%] pb-4">
					<ListImage className="listImage" >
						{nftDetail.image && <img src={nftDetail.image} className="img rounded-[10px]" />}
					</ListImage>
					<ListContent className="listContent">
						<BoxBetween>
							<BoxCenter className=" px-2 py-2 rounded-xl bg-white">
								{/* <Avatar className="" alt="Remy Sharp" src="/static/images/cards/avatar.png" />
								<TypographySize18 className="flex items-center pl-3">Steven Bartlett</TypographySize18> */}
								<TypographySize18 className=''>Nonce #: {nonce}</TypographySize18>
							</BoxCenter>
							<BoxCenter className="flex items-center">
								<TypographySize12 className="remain-btn pulse1 px-1 sm:px-2 py-2">Remaining 100/500</TypographySize12>
							</BoxCenter>
						</BoxBetween>
						<Box className="" style={{ marginTop: "5%" }}>
							<TypographySize42 className="pb-4">{nftDetail.contract_name} - {nftDetail.name}</TypographySize42>
							<TypographySize14 className="pb-4">A Collection Of 10000 Owl-Looking Portraits With Varying Traits. The NFT Gives Holders Access To Private Club Memberships Plus Other Perks</TypographySize14>
						</Box>
						{
							nftDetail.owner === account ?
								<Box>
									<Box className="flex pb-4">
										<img src="/static/images/dollar-circle.png" alt='' />
										<TypographySize14 className="flex items-center">Price:</TypographySize14>
									</Box>
									<Box className="grid grid-cols-1 md:grid-cols-2 items-center">
										{modalflag ?
											<TypographySize32>$ {modalPrice}</TypographySize32>
											:
											<TypographySize32>$ {initialPrice}</TypographySize32>
										}
										{modalflag ?
											<TypographySize14>/ {modalPriceValue} {coinTypes[coin].name}</TypographySize14>
											:
											<TypographySize14>/ {initialpriceValue} {coinTypes[coin].name}</TypographySize14>
										}
									</Box>
								</Box>
								:
								<Box>
									<Box className="flex pb-4">
										<img src="../static/images/dollar-circle.png" />
										<TypographySize14 className="flex items-center">Price:</TypographySize14>
									</Box>
									<Box className="grid grid-cols-1 md:grid-cols-2 items-center">
										<TypographySize32>$ {initialPrice}</TypographySize32>
										<TypographySize14>/ {initialpriceValue} {coinTypes[coin].name}</TypographySize14>
									</Box>
								</Box>
						}

						{
							nftDetail.owner === account ?
								<Box className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-8 md:pt-24">
									<div className="cursor-pointer flex justify-center btn pulse1 w-full" onClick={handleModalChangeOpen}>Change Price</div>
									<div className="cursor-pointer flex justify-center outlined-btn connect-btn pulse1 w-full" onClick={handleModalOpen}>Cancel Sale</div>
								</Box>
								:
								<>
									<Box className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-8 md:pt-24">
										<a className="flex justify-center btn pulse1 w-full" onClick={buyOrder}>
											{
												buyLoading === 0 ? 'Buy' : 'Approving...'
											}
										</a>
										<Box className="outlined-btn px-3">
											<select className="w-full bg-transparent h-full" onChange={onChange} style={{ outline: "none" }} value={OtherAction}>
												<option value="otheractions" >Other Actions</option>
												<option value="buyTokenWithSwap" >Buy Token With Swap</option>
												<option value="counteroffer">Counter Offer</option>
												<option value="openchat">Open A Chat</option>
												<option value="initiatecall">Initiate A Call</option>
											</select>
										</Box>
									</Box>

									<div id="buyTokenWithSwap" style={{ visibility: "hidden" }} className="flex items-center justify-start mt-10">
										<div className="w-full flex relative grid grid-cols-1 md:grid-cols-2">
											<div className="flex pb-4 md:pb-0">
												<select className="rounded-l-xl border border-r-0 border-[#71BED8] py-2 px-3 focus:outline-none focus-visible:outline-none"
													value={swapTokenAddress}
													onChange={handleSelectToken}
												>
													<option value=''>Select Token</option>
													{
														myBalances.map((item, index) => (
															<option key={index} value={item.contract_address}>{item.name}</option>
														))
													}
												</select>
												<input type='number' className="w-full border rounded-r-[10px] md:rounded-none md:border-r-0 border-[#71BED8] py-2 px-3 focus:outline-none focus-visible:outline-none"
													value={swapTokenAmount} onChange={handleSwapTokenAmount}
												/>
											</div>
											<div className="flex">
												<input readOnly className="w-full border rounded-l-[10px] md:rounded-none border-r-0 border-[#71BED8] py-2 px-3 focus:outline-none focus-visible:outline-none"
													value={swapTokenToUSD.toFixed(7)}
												/>
												<div className="bg-white border-y border-[#71BED8] flex items-center pr-2">
													<span>USD</span>
												</div>
												<a className='w-[250px] h-[42px] btn px-4 py-3 pulse rounded-l-none text-xs md:text-sm' onClick={handleBuyTokenWithSwap}>
													{
														buySwapLoading === 0 ? 'Buy with Swap' : (buySwapLoading === 1 ? 'Approving...' : 'Swapping...')
													}
												</a>
											</div>
										</div>
									</div>
								</>
						}
					</ListContent>
				</Box>
				<Box id="counteroffer" style={{ visibility: "hidden" }} className="w-full px-[7%] pb-4">
					<TypographySize20>Your Assets</TypographySize20>
					{/* <div className="flex items-center justify-start">
						<div className="flex">
							<input className="w-[400px] border border-[#71BED8] rounded-l-xl py-2 px-3 focus:outline-none focus-visible:outline-none"
								value={searchAddress}
								onChange={(e) => setSearchAddress(e.target.value)} />
							<a className='btn px-6 py-3 pulse rounded-l-none text-xl' onClick={handleSearch}>Search</a>
						</div>
					</div> */}
					<Container>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
							<div className="flex flex-col gap-y-2">
								{myBalances.map((myBalance, index) => {
									const id = myBalance.id;
									let offerdata = finalOfferdatas.tokens.find(item => item.id === id);
									let validatedToken = validatedTokens.find(item => item.name === myBalance.name);
									let className = !disableflag ? "asset" : "asset-disable";
									let balance = parseFloat(!offerdata ? myBalance.balance : (myBalance.balance - offerdata.balance));
									let display_balance = parseFloat(myBalance.chain === '0x1' ? getWeiToInt(balance) : balance).toFixed(4)
									return (
										<AssetCard
											draggable
											onDragStart={(e) => onDragStart(e, 'token', myBalance.name)}
											key={index}
											className={className}
											style={{ width: '100%', position: 'relative' }}
										>
											<div className="flex items-center w-full h-full justify-between">
												<div className="w-[30px] h-full flex items-center">
													<img src="../static/images/client/image 14.png" />
												</div>
												<div className="flex-1 w-full h-full flex items-center justify-center">
													<div className="w-1/2 pr-2">
														<div className="truncate text-right text-xl">{display_balance}</div>
													</div>
													<div className="w-1/2 pl-2">
														<div className="truncate text-xl">{myBalance.name}</div>
													</div>
												</div>
												<div className="flex items-center h-full w-[30px]">
													{!validatedToken ?
														<img id={"error-img" + myBalance.name} />
														:
														<img id={"success-img" + myBalance.name} src="../static/images/client/image 20.png" />
													}
												</div>
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
									<div className="text-center pt-4">No Items</div>
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
							<div className="items-start w-full h-full grid grid-cols-1 md:grid-cols-2">
								<div className="w-full h-full custom-scrollbar">
									{finalOfferdatas.tokens.map((offerdata, index) =>
										<CounterCard key={index} style={{ justifyContent: "space-between" }}>
											<TypographySize20 className="pr-8 w-full">
												<input className="mx-2 w-full" name={offerdata.name} onChange={(e) => handleChange(e, offerdata.name, offerdata.chain)}
													value={offerdata.chain === '0x1' ? getWeiToInt(offerdata.balance) : offerdata.balance} />
											</TypographySize20>
											<TypographySize20 className="truncate w-[50px]">{offerdata.name}</TypographySize20>
											<CloseIcon className='mr-2' onClick={(e) => handleRemoveOffer('token', offerdata.id, offerdata.contract_address)} />
										</CounterCard>
									)}
								</div>
								<div className="w-full h-full custom-scrollbar">
									{finalOfferdatas.nfts.map((offerdata, index) =>
										<CounterCard key={index}>
											<img className="ml-4" src={offerdata.image} style={{ height: "100%", width: "auto" }} />
											<TypographySize20 className="px-4 flex-1">{offerdata.name}</TypographySize20>
											<CloseIcon className='mr-2' onClick={(e) => handleRemoveOffer('nft', offerdata.tokenId, offerdata.contract_address)} />
										</CounterCard>
									)}
								</div>
							</div>
						</Border>
					</div>
					<div className="block md:flex justify-between my-6 md:my-12">
						<div className="grid pb-4 grid-cols-1 md:pb-0 md:grid-cols-2">
							<TypographySize20>Estimated Offer Value</TypographySize20>
							<TypographySize20>$ {totalprice}</TypographySize20>
						</div>
						<div>
							<OfferButton className=" pulse1">
								<Link
									component={RouterLink}
									underline="none"
									color="inherit"
									className="w-full h-full flex justify-center py-4"
									// to={{
									// 	pathname: `/list/0xD9D1d191F530760Afa9842B36B75EE0800c9B1C9/3`,
									// }}
									state={pricedata}
									onClick={makeCounterOffer}
								>
									{
										MakeOfferLoading === 0 ? 'Make Offer' : (MakeOfferLoading === 1 ? 'Approving...' : 'Offering...')
									}
								</Link>
							</OfferButton>
						</div>
					</div>
				</Box>
			</div>
			<div style={{ position: "absolute", bottom: "70px", right: '10px', display: 'none' }} id="openchat">
				<BuyerChat roomname={"room" + nftDetail.give} username={username} closechat={closechat} openchat={openchat} isOpenedChat={isOpenedChat} role="buyer" />
			</div>
			<Toaster position="bottom-right" />
			<Modal open={isOpen} onClose={handleClose} img={nftDetail.image} content={content} />

			<CancelSale open={isModalOpened} onClose={handleModalClose} image={nftDetail.image} nonce={nonce} />
			<ChangePrice open={isModalOpen} onClose={handleModalChangeClose} image={nftDetail.image} setPrice={setModalPrice} price={modalPrice} setPriceValue={setModalPriceValue} coinPrice={coinPrice} handleFlag={handleModalFlag} handleChangeFlag={handleChangeFlag} />
		</Box >
	);
}

export default Buyer;