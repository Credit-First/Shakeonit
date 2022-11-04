import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import Box from "@material-ui/core/Box";
import BoxCenter from '../../../components/Box/BoxCenter';
import WestIcon from '@mui/icons-material/West';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { TypographySize14, TypographySize18 } from '../../../components/Typography/TypographySize';
import { useState } from 'react';
import { ethers } from 'ethers'
import SendPost from './facebooksdk/sendpost';
import Config from '../../../config/app';
import { coinTypes } from '../../../content/config';
import { useWeb3React } from "@web3-react/core";
import Spinner from '../../../components/Spinner';
import TransactionStatus from '../../../components/Modal/transactionStatus';

function Sharelink({
	contract_address,
	tokenId,
	image,
	name,
	handleshowFlag,
	priceValue,
	coinPrice,
	coinType,
	coin
}) {
	const { account } = useWeb3React();
	const pricedata = {
		coin: coin,
		coinPrice: coinPrice,
		priceValue: priceValue,
		coinType: coinType
	}
	const [value, setValue] = useState("");
	const [linkFlag, setLinkFlag] = useState(false);
	const [loadingState, setLoadingState] = useState(0);
	const [transactionModalOpen, setTransactionModalOpen] = useState(false);
	const [approveLoading, setApproveLoading] = useState(0);
	const [confirmLoading, setConfirmLoading] = useState(0);
	const [transactionStatusModalTitle, setTransactionModalTitle] = useState('Create Order');
	const [approveTitle, setApproveTitle] = useState('');
	const [confirmTitle, setConfirmTitle] = useState('');

	const handleLinkaddress = (nonce) => {
		setValue(`${window.location.origin}/#/buyer/${nonce}`);
		setLinkFlag(true);
	}

	let facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='
	let twitterShareUrl = 'https://twitter.com/share?ref_src=twsrc%5Etfw'


	const createOrder = () => async () => {
		const ethereum = window.ethereum;

		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const walletAddress = accounts[0]    // first account in MetaMask
		const provider = new ethers.providers.Web3Provider(ethereum)
		const signer = provider.getSigner(walletAddress)

		let get = coin ? coinTypes[coin].address : '0x0000000000000000000000000000000000000000'
		let give = contract_address
		let amountGive = tokenId // (wei for 0.0001 WETH) SHOULD BE THE NFT @ AMOUNT OF 1
		let amountGet = ethers.utils.parseUnits(pricedata.priceValue) // Should pull in price data value from the input in Listitemforsale File
		let buyer = '0x0000000000000000000000000000000000000000' // 0x0 address so anyone can buy

		const nftContract = new ethers.Contract(contract_address, Config.nftContract.abi, signer)
		const tokenContract = new ethers.Contract(get, Config.tokenContract.abi, signer)
		const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)

		const owner = await nftContract.ownerOf(amountGive);

		if (owner !== account) return alert('you are not an owner of this nft.')

		setTransactionModalOpen(true);
		setApproveTitle(`${coin ? coinTypes[coin].name : 'BNB'} ( ${pricedata.priceValue} )`);
		setConfirmTitle(`Listing ${name}`)
		setApproveLoading(1);
		tokenContract.approve(Config.shakeonit.address, amountGet)
			.then(() => { })
			.catch(() => {
				setLoadingState(0)
				setApproveLoading(3)
			});

		nftContract.approve(Config.shakeonit.address, amountGive)
			.then(() => { })
			.catch(() => {
				setLoadingState(0)
				setApproveLoading(3)
			});

		setLoadingState(1);

		const flags = {
			nft: false,
			token: false,
		}

		const processCallback = () => {
			// TODO: process
			setLoadingState(2);
			setApproveLoading(2);
			setConfirmLoading(1);
			shakeContract.makeOrder(give, get, amountGive, amountGet, buyer, { gasLimit: 300000 })
				.then(() => { })
				.catch(() => {
					setLoadingState(0);
					setConfirmLoading(3);
				})
		}

		tokenContract.on("Approval", (owner, spender, value) => {
			if (owner === account && value.toString() === amountGet.toString()) {
				if (!flags.nft || !flags.token) return;
				flags.token = true;
				processCallback();
			}
		})

		nftContract.on("Approval", (owner, approved, tokenId) => {
			if (owner === account && tokenId.toString() === amountGive) {
				if (!flags.nft || !flags.token) return;
				flags.nft = true;
				processCallback();
			}
		});

		shakeContract.on("PlaceOrder", (give, get, amountGive, amountGet, nonce) => {
			setLoadingState(3);
			setConfirmLoading(2);
			alert('Create Order Successfully');
			handleLinkaddress(nonce);
		})
	}
	return (
		<Box style={{ height: "100%" }}>
			<Card
				className="pb-4 card-m grid-size relative"
				style={{
					borderRadius: "20px", height: "100%"
				}}
			>
				<div className='px-10 xs:mx-9'>
					<Box className='pt-12 pb-10 pl-1'>
						<div onClick={(e) => handleshowFlag()}><WestIcon /></div>
					</Box>
					<Box>
						<TypographySize18 className=''>Share Link</TypographySize18>
						<TypographySize14 className='py-2'>Copy Or Share Link Automatically</TypographySize14>
					</Box>
					<Box className='grid grid-cols-4 gap-2 md:gap-4 lg:gap-10 my-8'>
						<div className='flex items-center justify-center'>
							<BoxCenter className='border-icon pulse w-12 h-12'>
								{!linkFlag ?
									<a style={{ cursor: "default", pointerEvents: "none" }} href='https://www.youtube.com/' target="_blank" rel="noreferrer"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
									:
									<a href='https://www.youtube.com/' target="_blank" rel="noreferrer"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
								}
							</BoxCenter>
						</div>
						<div className='flex items-center justify-center'>
							<BoxCenter className='border-icon pulse w-12 h-12'>
								{!linkFlag ?
									<a style={{ cursor: "default", pointerEvents: "none" }} href={facebookShareUrl} target="_blank" rel="noreferrer"><FacebookIcon /> </a>
									:
									<a href={facebookShareUrl} target="_blank" rel="noreferrer"><FacebookIcon /> </a>
								}
							</BoxCenter>
						</div>
						<div className='flex items-center justify-center'>
							<BoxCenter className='border-icon pulse w-12 h-12'>
								{!linkFlag ?
									<a rel="noreferrer" style={{ cursor: "default", pointerEvents: "none" }} href={twitterShareUrl} data-text="Check out my NFT!" target="_blank"><TwitterIcon /><script async src="https://platform.twitter.com/widgets.js"></script></a>
									:
									<a rel="noreferrer" href={twitterShareUrl} data-text="Check out my NFT!" target="_blank"><TwitterIcon /><script async src="https://platform.twitter.com/widgets.js"></script></a>
								}
							</BoxCenter>
						</div>
						<SendPost disable={linkFlag} />
					</Box>
					<Box className='mt-3 mb-12 TextField-without-border-radius'>
						<TextField
							fullWidth
							name="content"
							placeholder='http://shakeonit.com'
							minRows={1}
							variant="outlined"
							value={value}
							className="address"
						/>
					</Box>
					<Box>
						<Button className='outlined-btn pulse' style={{ width: "50%" }} onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy</Button>
					</Box>
				</div>
				<Box className='flex justify-center' style={{ position: "absolute", bottom: "2rem", width: "100%" }}>
					<Link
						component={RouterLink}
						underline="none"
						color="inherit"
						className="btn tex-btn pulse flex justify-center"
						// to={{
						//     pathname: `/buyer/1`,
						// }}
						state={pricedata}
						style={{ width: "86%" }}
						onClick={createOrder()}
					>
						{
							loadingState === 1 ? (
								<>
									<Spinner />
									<span>Approving...</span>
								</>
							) : (loadingState === 2 ? (
								<>
									<Spinner />
									<span>Listing...</span>
								</>
							) : (loadingState === 3 ? 'Done' : 'Create Order'))
						}
					</Link>
				</Box>
			</Card>
			<TransactionStatus
				name={name}
				image={image}
				contractAddress={contract_address}
				open={transactionModalOpen}
				setOpen={setTransactionModalOpen}
				approveLoading={approveLoading}
				confirmLoading={confirmLoading}
				title={transactionStatusModalTitle}
				approveTitle={approveTitle}
				confirmTitle={confirmTitle}
			/>
		</Box>
	);
}

export default Sharelink;