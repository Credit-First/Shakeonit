import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import WestIcon from '@mui/icons-material/West';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { GradientButton } from '../../../components/Button/Button'
import Select from '@mui/material/Select';
import { TypographySize121, TypographySize14, TypographySize18 } from '../../../components/Typography/TypographySize';
import { coinTypes } from '../../../content/config'
import { contract, web3 } from '../../../content/contractMethods'
import { BigNumber, ethers } from 'ethers'

function Listitemforsale(props) {
    const { handleshowFlag, priceValue, setPriceValue, coinPrice, coin, setCoinType } = props
    const [dayValue, setDayValue] = useState("");
    const [isError, setError] = useState(false);
    const [isErrorday, setErrorday] = useState(false);
    const handleChangemoney = (event) => {
        const re = /^[0-9.\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setPriceValue(event.target.value);
            setError(false);
        }
        else {
            // console.log("This is else.");
            setError(true);

        }
    }

    const handleDay = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setDayValue(e.target.value);
            setErrorday(false);
        }
        else {
            setErrorday(true);
        }
    }

    const handleChange = (event) => {
        setCoinType(event.target.value);
    };

    return (
        <Box style={{ height: "100%" }}>
            <Card
                className="pb-4 card-m relative"
                style={{
                    borderRadius: "20px", height: "100%"
                }}
            >
                <Box className='px-8 xs:mx-9'>
                    <Box className='py-12 pl-3'>
                        <a href='/#/collections'>
                            <WestIcon />
                        </a>
                    </Box>
                    <Box>
                        <Box>
                            <a href="#">
                                <TypographySize18>List item for sale</TypographySize18>
                            </a>
                        </Box>
                        <Box>
                            <TypographySize14 className='py-2'>Out Your NFT On The Market</TypographySize14>
                        </Box>
                    </Box>
                    <Box className='py-6'>
                        <TypographySize18>About your offer</TypographySize18>
                    </Box>
                    <Box>
                        <Box className='pb-1'>
                            <TypographySize121>Description</TypographySize121>
                        </Box>
                        <Box className='TextField-without-border-radius'>
                            <TextField
                                fullWidth
                                name="content"
                                multiline
                                minRows={4}
                                variant="outlined"
                                placeholder='Please enter text here'
                            />
                        </Box>
                    </Box>
                    <Box className='my-4'>
                        <Box className='pb-1'>
                            <TypographySize121>Price</TypographySize121>
                        </Box>
                        <Box className='block sm:flex sm:grid sm:grid-cols-3 gap-4'>
                            <Box className="mb-4 sm:mb-0 TextField-without-border-radius" >
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={coin}
                                        onChange={handleChange}
                                    >
                                        {
                                            coinTypes.map((item, _i) => <MenuItem value={_i} key={_i}>{item.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box className="sm:col-span-2 TextField-without-border-radius">
                                <div className='border border-1 border-gray-300 px-2 text-gray-400' style={{ borderRadius: "10px" }}>
                                <input onChange={handleChangemoney} value={priceValue} placeholder="Please enter number here" style={{ outline: "none", minWidth : "100%", color: "black" }}></input>
                                    <div>&#8776; {(priceValue * coinPrice[coin])} usd</div>
                                </div>
                                {isError ?
                                    <span className='text-red-400 text-md error flex justify-end'>You must input only number</span> : null
                                }

                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <TypographySize121  className='pb-1'>Duration</TypographySize121>
                        <Box className='flex'>
                            <Box className="TextField-without-border-radius" style={{width : "31%"}}>
                                <TextField
                                    // fullWidth
                                    name="content"
                                    minRows={1}
                                    variant="outlined"
                                    onChange={handleDay}
                                    value={dayValue}
                                    placeholder="0"
                                />
                            </Box>
                            <Box className='px-4' style={{ alignSelf: "center" }}>
                                <TypographySize14>Days</TypographySize14>
                            </Box>
                        </Box>
                        {isErrorday ?
                            <span className='text-red-400 text-md error flex justify-end'>You must input only integer</span> : null
                        }
                    </Box>
                    <Box className="block xl:flex xl:justify-between" style={{marginTop : "10%"}}>
                        <p className='text-price mb-3'>Total Price:</p>
                        <p className='text-blue-usd mb-3'>USD &nbsp;&nbsp; {(priceValue * coinPrice[coin])}</p>
                    </Box>
                </Box>
                <Box className='flex justify-center' style={{ width: "100%", position: "absolute", bottom: "2rem" }}>
                    <a className='flex justify-center btn tex-btn pulse' style={{ width: "86%" }} onClick={(e) => handleshowFlag()}>Next</a>
                </Box>
            </Card>
        </Box>
    );
}

export default Listitemforsale;