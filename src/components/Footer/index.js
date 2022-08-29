import React, { useState } from "react";
import { useLocation } from "react-router";
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
import BoxEnd from "../Box/BoxEnd";
import BoxStart from "../Box/BoxStart";
import { TypographySize141 } from "../Typography/TypographySize";

const LinkStyle = Styled(Link)({
    display: "flex",
    justifyContent: "center"
});

const BoxIcon = Styled(Box)({
    color: "white",
    paddingLeft: "1rem"
})


export default function Footer() {
    const [isFlag, setFlag] = useState(false);
    const [account, setAcccount] = useState("Connect Wallet");
    function getAddress(account) {
        setAcccount(account);
        setFlag(!isFlag);
    }
    const location = useLocation();
    const [isOpened, setOpened] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => {
        setOpened(true);
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
    function ellipseAddress(address = "", width = 6) {
        return `${address.slice(0, width)}...${address.slice(-width)}`;
    }
    return (
        <Box style={{ backgroundColor: "#2E3951" }}>
            <BoxCenter className="pt-12 py-6">
                <LinkStyle href="/">
                    <img src="/static/images/footer/Frame 2 (1).png" alt="footer" />
                </LinkStyle>
            </BoxCenter>
            <Box className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 text-footer pb-4 lg:px-64" style={{ fontSize: "20px", fontWeight: "400" }}>
                <LinkStyle underline="none" color="inherit" href="/marketplace">Marketplace</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/resources">Resources</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/company">Company</LinkStyle>
                {!isFlag ? <LinkStyle underline="none" color="inherit" onClick={() => handleOpen()}>Connect Wallet</LinkStyle> :
                    <LinkStyle underline="none" color="inherit" onClick={() => handleDisconnect()}>Connect Wallet</LinkStyle>
                }
                <LinkStyle underline="none" color="inherit" href="/help">Help</LinkStyle>
                <LinkStyle underline="none" color="inherit" href="/privacypolicy">Privacy Policy</LinkStyle>
            </Box>
            <Box style={{ height: "30px" }} className="px-24">
                <Box className="border-b border-gray-400"></Box>
            </Box>
            <Box className="px-24 grid grid-cols-1 md:grid-cols-2 flex items-center pb-6">
                <BoxStart>
                    <TypographySize141 style={{ textAlign: 'center' }}>© 2022 Shakeonit. All rights reserved</TypographySize141>
                </BoxStart>
                <BoxEnd>
                    <BoxIcon><InstagramIcon /></BoxIcon>
                    <BoxIcon><YouTubeIcon /></BoxIcon>
                    <BoxIcon><TwitterIcon /></BoxIcon>
                    <BoxIcon><FacebookIcon /></BoxIcon>
                </BoxEnd>
            </Box>
            <Wallet open={isOpened} onClose={handleClose} getData={getAddress} />
            <Sign open={isOpen} onClose={handleSignClose} getName={getAddress} />
        </Box>
    );
}