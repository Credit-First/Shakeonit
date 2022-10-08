import React, { useEffect, useState } from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Styled from '@mui/material/styles/styled';
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Wallet from "../Modal/wallet";
import Sign from "../Modal/sign";
import BoxCenter from "../Box/BoxCenter";
import { TypographySize141 } from "../Typography/TypographySize";

const LinkStyle = Styled(Link)({
    display: "flex",
    justifyContent: "center"
});

const BoxIcon = Styled(Box)({
    color: "white",
    paddingLeft: "1rem"
})


export default function Footer({isOpen, isOpened, setOpen, setOpened}) {
    
    const [account, setAcccount] = useState("Connect Wallet");
    function getAddress(accountValue) {
        setAcccount(accountValue);
        window.localStorage.setItem('account', accountValue);
    }
    const handleDisconnect = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpened(false);
    }
    const handleSignClose = () => {
        setOpen(false);
    }
    // function ellipseAddress(address = "", width = 6) {
    //     return `${address.slice(0, width)}...${address.slice(-width)}`;
    // }
    useEffect(() => {
        window.localStorage.getItem('isOpened');
        // console.log("12");
    })
    // console.log(window.localStorage.getItem('isOpened'), "8888888888");
    return (
        <Box style={{ backgroundColor: "#2E3951" , position : "absolute", minWidth : "100%" }}>
            <BoxCenter className="pt-12 py-6">
                <LinkStyle href="/">
                    <img src="/static/images/footer/Frame 2 (1).png" alt="footer" />
                </LinkStyle>
            </BoxCenter>
            <Box className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 text-footer pb-4 lg:px-64" style={{ fontSize: "20px", fontWeight: "400" }}>
                <LinkStyle underline="none" color="inherit">Marketplace</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/#/resources">Resources</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/#/company">Company</LinkStyle>
                {!window.localStorage.getItem('account') ? <LinkStyle underline="none" color="inherit" onClick={() => setOpened(true)}>Connect Wallet</LinkStyle> :
                    <LinkStyle underline="none" color="inherit" onClick={() => handleDisconnect()}>Connect Wallet</LinkStyle>
                }
                <LinkStyle underline="none" color="inherit">Help</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/#/privacypolicy">Privacy Policy</LinkStyle>
            </Box>
            <Box style={{ height: "30px" }} className="px-24">
                <Box className="border-b border-gray-400"></Box>
            </Box>
            <Box className="px-24 grid grid-cols-1 md:grid-cols-2 flex items-center pb-6">
                <Box className="flex justify-center md:justify-start">
                    <TypographySize141 style={{ textAlign: 'center' }}>© 2022 Shakeonit. All rights reserved</TypographySize141>
                </Box>
                <Box className="flex justify-center md:justify-end">
                    <BoxIcon><InstagramIcon /></BoxIcon>
                    <BoxIcon><YouTubeIcon /></BoxIcon>
                    <BoxIcon><TwitterIcon /></BoxIcon>
                    <BoxIcon><FacebookIcon /></BoxIcon>
                </Box>
            </Box>
            {/* <Wallet open={isOpened} onClose={handleClose} getData={getAddress} /> */}
            <Sign open={isOpen} onClose={handleSignClose} getName={getAddress} />
        </Box>
    );
}