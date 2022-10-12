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
// import { ethers } from 'ethers'
import SendPost from './facebooksdk/sendpost';

// import { contractAddress, contractAbi  } from '../../../content/contractMethods';


function Sharelink({ contract_address, tokenId, handleshowFlag, priceValue, coinPrice, coinType, coin }) {
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


    const createOrder = (c_address, tokenId) => async () => {
        return
        // ETHERS SETUP
        // const ethereum = window.ethereum;

        // const accounts = await ethereum.request({
        //     method: "eth_requestAccounts",
        // });
        // const walletAddress = accounts[0]    // first account in MetaMask
        // const provider = new ethers.providers.Web3Provider(ethereum)
        // const signer = provider.getSigner(walletAddress)

        // const shakeContract = new ethers.Contract(contractAddress, contractAbi, signer)

        // let get = '0x0000000000000000000000000000000000000000'
        // let give = c_address // Ropsten WETH Collection
        // let amountGive = tokenId // (wei for 0.0001 WETH) SHOULD BE THE NFT @ AMOUNT OF 1
        // let amountGet = ethers.utils.parseUnits(pricedata.priceValue) // Should pull in price data value from the input in Listitemforsale File
        // let buyer = '0x0000000000000000000000000000000000000000' // 0x0 address so anyone can buy

        // await shakeContract.makeOrder(give, get, amountGive, amountGet, buyer, {
        //     value: 0, 
        //     gasLimit: 275000
        // }).then(res => {
        //     console.log(res)
        // })
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
                        <div onClick={(e) => handleshowFlag()}><WestIcon /></div>
                    </Box>
                    <Box>
                        <TypographySize18 className=''>Share Link</TypographySize18>
                        <TypographySize14 className='py-2'>Copy or Share Link Automatically</TypographySize14>
                    </Box>
                    <Box className='grid grid-cols-4 gap-10 my-8'>
                        <div>
                            <BoxCenter className='border-icon pulse'>
                                {!linkFlag ?
                                    <a style={{ cursor: "default", pointerEvents: "none" }} href='https://www.youtube.com/' target="_blank" rel="noreferrer"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
                                    :
                                    <a href='https://www.youtube.com/' target="_blank" rel="noreferrer"><YouTubeIcon /><script src="https://apis.google.com/js/platform.js"></script></a>
                                }
                            </BoxCenter>
                        </div>
                        <div>
                            <BoxCenter className='border-icon pulse'>
                                {!linkFlag ?
                                    <a style={{ cursor: "default", pointerEvents: "none" }} href={facebookShareUrl} target="_blank" rel="noreferrer"><FacebookIcon /> </a>
                                    :
                                    <a href={facebookShareUrl} target="_blank" rel="noreferrer"><FacebookIcon /> </a>
                                }
                            </BoxCenter>
                        </div>
                        <div>
                            <BoxCenter className='border-icon pulse'>
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
                        to={{
                            pathname: `/buyer/${contract_address}/${tokenId}`,
                        }}
                        state={pricedata}
                        style={{ width: "86%" }}
                        onClick={createOrder(contract_address, tokenId)}
                    >
                        Done
                    </Link>
                </Box>
            </Card>
        </Box>
    );
}

export default Sharelink;