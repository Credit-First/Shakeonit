import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import BoxCenter from '../../../components/Box/BoxCenter';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Listitemforsale from './Listitemforsale';
import Sharelink from './sharelink';
import PreviewCard from '../../../components/Card/PreviewCard';
import { TypographySize20 } from '../../../components/Typography/TypographySize';
import { coinTypes } from '../../../content/config'
import { height } from '@mui/system';

const collections = [
    { id: "1", image: "/static/images/cards/Rectangle 38.png", name: "Moonbirds" },
    { id: "2", image: "/static/images/cards/Rectangle 40.png", name: "Bored Ape" },
    { id: "3", image: "/static/images/cards/Rectangle 42.png", name: "Bored Ape Yacht Club" }
];

function Preview() {
    const { collectionId } = useParams();

    const collection = collections.filter((item) => item.id == collectionId)[0];
    const [priceValue, setPriceValue] = useState(0);
    const [showFlag, setShowFlag] = useState(false);
    const [coinPrice, setCoinPrice] = useState(Array(coinTypes).fill(0))
    const [coin, setCoinType] = useState(0);

    window.addEventListener("resize", onResizeFunction);

    function onResizeFunction(e) {
        const element = document.getElementById("content");
        const width = element.offsetWidth;
        const height = parseInt(width*1.9) + "px";
        element.style.height = parseInt(width * 1.9) + "px";
        console.log(height, "@@@@@");
    }

    
    useEffect(() => {
        const element = document.getElementById("content");
        const width = element.offsetWidth;
        // const height = parseInt(width*1.9) + "px";
        element.style.height = parseInt(width * 1.9) + "px";
      }, []);


    React.useEffect(() => {
        getCoinPrice()
    }, [])

    const handleshowFlag = () => {
        setShowFlag(!showFlag);
    };
    const handlePreview = () => {
        setShowFlag(false);
    };

    const getCoinPrice = () => {
        coinTypes.forEach((item, index) => {
            // fetch(`https://api.pancakeswap.info/api/v2/tokens/${item.address}`)
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${item.name}USDT`)
                .then(res => res.json())
                .then(res => {
                    if (res.price) {
                        setCoinPrice((prev) => {
                            const tempPrice = [...prev]
                            tempPrice[index] = res.price
                            return tempPrice
                        })
                    }
                })
        })
    }

    console.log(priceValue);
    return (
        <Box>
            <Header />
            <Box className="total py-16" style={{ backgroundColor: "#ebf2f5" }}>
                <Box className='totalbox'>
                    {/* <a onClick={handlePreview}><TypographySize20>Preview</TypographySize20></a> */}
                    <BoxCenter className="imagebox">
                        <Box className='image'>
                            <a onClick={handlePreview} className="hidden md:block"><TypographySize20>Preview</TypographySize20></a>
                            <PreviewCard image={collection.image} name={collection.name} value={(priceValue * coinPrice[coin])} />
                        </Box>
                    </BoxCenter>
                    <Box className="contentbox" id='content'>
                        {!showFlag ? 
                        <Listitemforsale handleshowFlag={handleshowFlag} priceValue={priceValue} setPriceValue={setPriceValue} coinPrice={coinPrice} coin={coin} setCoinType={setCoinType} /> : 
                        <Sharelink id={collection.id} handleshowFlag={handleshowFlag} />}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

export default Preview;