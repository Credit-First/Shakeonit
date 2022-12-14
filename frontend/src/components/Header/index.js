import { useState } from "react";
import { useLocation } from "react-router";
import { Hidden, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sign from "../Modal/sign";
import { useEffect } from "react";
import WalletModal from "../Modal/wallet";

const StyleMenuItem = styled('li')({
    padding: 20,
    '&.active': {
        color: '#10B0C7',
        opacity: 1
    }
});
const menuTypes = [
    { url: "/", name: "Home" },
    { url: "/#/collections", name: "Make a Trade" },
    { url: "/#/company", name: "About" },
    { url: "/#/resources", name: "Tutorials" },
]
export default function Header({isOpen, isOpened, setOpen, setOpened}) {
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if(window.location.href.includes("/preview") || window.location.href.includes("/list/") || window.location.href.includes("/buyer")) {
            setFlag(true);
        }
    }, []);

    function getAddress(accountValue) {
        window.localStorage.setItem('account', accountValue);
    }
    const [navbar, setNavbar] = useState(false);
    const location = useLocation();

    const handleSignClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box className="flex justify-between" style={{ height: "100px", width: "100%", background: "white", paddingRight: 26 }}>
                <Link href="/" className="flex" style={{textDecoration: 'none', padding: 26}}>
                    <img src="../logo.svg" alt="logo" />
                    <p className="desktop-visible" style={{padding: 8, fontFamily: 'Mina', fontWeight: 700, fontSize: 24, color: '#38435E'}}>Shakeonit</p>
                </Link>
                <Hidden lgDown>
                    {!flag ? 
                    <Box className="flex items-center" style={{ width: "45%" }}>
                        <ul className="flex justify-between" style={{ width: "100%" }}>
                            {
                                menuTypes.map((item, _i) => {
                                    let activeClass = ""
                                    if (location.pathname === item.url)
                                        activeClass = "active"
                                    return <StyleMenuItem className={`text-header hover:text-indigo-200 ${activeClass}`} key={_i}>
                                        <a href={item.url}>{item.name}</a>
                                    </StyleMenuItem>
                                })
                            }
                        </ul>
                    </Box> : 
                    <Box className="flex items-center" style={{ width: "45%" }}>
                        <ul className="flex justify-between" style={{ width: "100%" }}>
                            {
                                menuTypes.map((item, _i) => {
                                    let activeClass = ""
                                    if (location.pathname === item.url)
                                        activeClass = "active"
                                    return <StyleMenuItem className={`text-header hover:text-indigo-200 ${activeClass}`} key={_i}>
                                        <a href="#" style={{cursor: "default", pointerEvents: "none" }}>{item.name}</a>
                                    </StyleMenuItem>
                                })
                            }
                        </ul>
                    </Box>
                    }
                    <Box className="flex items-center">
                        <Box className="flex justify-center items-center" style={{ height: "56px", width: "211px" }}>
                            <WalletModal />
                        </Box>
                    </Box>
                </Hidden>
                <Hidden lgUp>
                    <Box className="flex items-center">
                        <Box className="text-center" style={{ background: 'white', padding: '24px 12px 24px 0' }}>
                            <Box className="" style={{ height: "56px", width: "160px", display: "inline-grid" }}>
                                <WalletModal />
                            </Box>
                        </Box>
                        <a onClick={() => setNavbar(!navbar)}>
                            {!navbar ?
                                <MenuIcon className="text-black-900" /> :
                                <CloseIcon className="text-black-900" />
                            }
                        </a>
                    </Box>
                </Hidden>
            </Box>
            
            <Hidden lgUp>
                <Box
                    className={`${navbar ? "block" : "hidden"}`} style={{ position: "absolute", zIndex: "999", width: "100%", background: "white" }}
                >
                    <ul className="">
                        {
                            menuTypes.map((item, _i) => {
                                let activeClass = ""
                                if (location.pathname === item.url)
                                    activeClass = "active"
                                return <StyleMenuItem className={`text-header hover:text-indigo-200 ${activeClass}`} key={_i}>
                                    <Box className="flex justify-between">
                                        <a href={item.url}>{item.name}</a>
                                        <KeyboardArrowRightIcon />
                                    </Box>
                                </StyleMenuItem>
                            })
                        }
                    </ul>
                </Box>
            </Hidden>
            <Sign open={isOpen} onClose={handleSignClose} getName={getAddress} />
        </>
    );
}