import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import Box from "@material-ui/core/Box";
import BoxCenter from '../../../components/Box/BoxCenter';
import Grid from "@material-ui/core/Grid";
import WestIcon from '@mui/icons-material/West';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { TypographySize14, TypographySize18 } from '../../../components/Typography/TypographySize';
import { useState } from 'react';
import Web3 from 'web3'
import { ethers, BigNumber } from 'ethers'
import SendPost from './facebooksdk/sendpost';

import { contract, contractAddress, contractAbi, web3  } from '../../../content/contractMethods';

function Sharelink({ id, handleshowFlag, priceValue, coinPrice, coinType, coin }) {
    const pricedata = {
        coin : coin,
        coinPrice : coinPrice,
        priceValue : priceValue,
        coinType : coinType
    }
    const [value, setValue] = useState("");
    const [linkFlag, setLinkFlag] = useState(false);
    const handleLinkaddress = () => {
        setValue(window.location.href);
        setLinkFlag(true);
    }

    let facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='
    let twitterShareUrl = 'https://twitter.com/share?ref_src=twsrc%5Etfw'

    const createOrder = async () => {
        // ETHERS SETUP
        const ethereum = window.ethereum;

        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0]    // first account in MetaMask
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner(walletAddress)

        // ethers contract instantiation
        const shakeContract = new ethers.Contract(contractAddress, contractAbi, signer)

        // Ropsten ETH Faucet Address
        // 0x81b7e08f65bdf5648606c89998a9cc8164397647

        // Ropsten WETH Address
        // 0xc778417E063141139Fce010982780140Aa0cD5Ab
        // 100000000000000 <--- wei for .001 WETH
        // Ropsten DAI Address
        // 0xaD6D458402F60fD3Bd25163575031ACDce07538D

        let get = '0xc778417E063141139Fce010982780140Aa0cD5Ab' // Ropsten WETH
        let give = '0xc778417E063141139Fce010982780140Aa0cD5Ab' // Ropsten WETH
        // Units in wei
        let amountGive = 100000000000000 // (wei for 0.0001 WETH) SHOULD BE THE NFT @ AMOUNT OF 1
        // Units in wei
        let amountGet = ethers.utils.parseUnits(pricedata.priceValue) // Should pull in price data value from the input in Listitemforsale File
        let buyer = '0x0000000000000000000000000000000000000000' // 0x0 address so anyone can buy

        await shakeContract.makeOrder(give, get, amountGive, amountGet, buyer, {
            gasLimit: 275000
        }).then(res => {
            console.log(res)
        })
    }

    // console.log(id, "=====");
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
                        <a onClick={(e) => handleshowFlag()}><WestIcon /></a>
                    </Box>
                    <Box>
                        <TypographySize18>Share Link</TypographySize18>
                        <TypographySize14 className='py-2'>Copy or Share Link Automatically</TypographySize14>
                    </Box>
                    <Box className='grid grid-cols-4 gap-10 my-8'>
                        <div>
                            <BoxCenter className='border-icon pulse'>
                                {!linkFlag ?
                                    <a style={{ cursor: "default", pointerEvents: "none" }} href='https://www.youtube.com/' target="_blank"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
                                    :
                                    <a href='https://www.youtube.com/' target="_blank"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
                                }
                            </BoxCenter>
                        </div>
                        <div>
                            <BoxCenter className='border-icon pulse'>
                                {!linkFlag ?
                                    <a style={{ cursor: "default", pointerEvents: "none" }} href={facebookShareUrl} target="_blank"><FacebookIcon /> </a>
                                    :
                                    <a href={facebookShareUrl} target="_blank"><FacebookIcon /> </a>
                                }
                            </BoxCenter>
                        </div>
                        <div>
                            <BoxCenter className='border-icon pulse'>
                                {!linkFlag ?
                                    <a style={{ cursor: "default", pointerEvents: "none" }} href={twitterShareUrl} data-text="Check out my NFT!" target="_blank"><TwitterIcon /><script async src="https://platform.twitter.com/widgets.js"></script></a>
                                    :
                                    <a href={twitterShareUrl} data-text="Check out my NFT!" target="_blank"><TwitterIcon /><script async src="https://platform.twitter.com/widgets.js"></script></a>
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
                            onClick={handleLinkaddress}
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
                        //     pathname: `/list/${id}`,                            
                        // }}
                        to={{
                            pathname: `/buyer/${id}`,
                        }}
                        state={pricedata}
                        style={{ width: "86%" }}
                        onClick={createOrder}
                    >
                        Done
                    </Link>
                </Box>
            </Card>
        </Box>
    );
}

export default Sharelink;