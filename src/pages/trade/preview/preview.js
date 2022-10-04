import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Box from "@material-ui/core/Box";
import BoxCenter from '../../../components/Box/BoxCenter';
import Listitemforsale from './Listitemforsale';
import Sharelink from './sharelink';
import PreviewCard from '../../../components/Card/PreviewCard';
import { TypographySize20 } from '../../../components/Typography/TypographySize';
import { coinTypes } from '../../../content/config'


const Preview = () => {
    const { tokenId } = useParams();
    const nftDetail = JSON.parse(localStorage.getItem('shakeonit_preview'));
    
    const [priceValue, setPriceValue] = useState("");
    const [showFlag, setShowFlag] = useState(false);
    const [coinPrice, setCoinPrice] = useState(Array(coinTypes).fill(0))
    const [coin, setCoinType] = useState(0);

    window.addEventListener("resize", onResizeFunction);

    function onResizeFunction(e) {
        const element = document.getElementById("content");
        if(element){
            const width = element.offsetWidth;
            const height = parseInt(width*1.9) + "px";
            element.style.height = parseInt(width * 1.9) + "px";
        }
    }

    
    useEffect(() => {
        const element = document.getElementById("content");
        if(element){
            const width = element.offsetWidth;
            element.style.height = parseInt(width * 1.9) + "px";
        }
    }, []);
    

    useEffect(() => {
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

    return (
        <Box>
            <Box className="total py-16" style={{ backgroundColor: "#ebf2f5" }}>
                <Box className='totalbox'>
                    <BoxCenter className="imagebox">
                        <Box className='image'>
                            <a onClick={handlePreview} className="hidden md:block"><TypographySize20>Preview</TypographySize20></a>
                            <PreviewCard image={nftDetail.image} name={nftDetail.name} value={(priceValue * coinPrice[coin])} />
                        </Box>
                    </BoxCenter>
                    <Box className="contentbox" id='content'>
                        {!showFlag ? 
                        <Listitemforsale handleshowFlag={handleshowFlag} priceValue={priceValue} setPriceValue={setPriceValue} coinPrice={coinPrice} coin={coin} setCoinType={setCoinType} /> : 
                        <Sharelink id={nftDetail.tokenId} handleshowFlag={handleshowFlag} priceValue={priceValue} coinPrice={coinPrice[coin]} coinType={coinPrice} coin={coin} />}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Preview;