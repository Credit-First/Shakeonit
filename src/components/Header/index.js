import { useState } from "react";
import { useLocation } from "react-router";
import { Hidden, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Wallet from "../Modal/wallet";
import Sign from "../Modal/sign";
import useLocalStorage from "../../Hook/useLocalStorage";
import { useEffect } from "react";

const StyleMenuItem = styled('li')({
    padding: 20,
    '&.active': {
        color: '#10B0C7',
        opacity: 1
    }
});
const menuTypes = [
    { url: "/", name: "Home" },
    { url: "/collections", name: "Make a Trade" },
    { url: "/company", name: "Company" },
    { url: "/resources", name: "Resources" },
]
export default function Header() {
    const [value, setValue] = useState("");
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setValue(window.location.href);
        if(value.includes("/preview") || value.includes("/list/")) {
            setFlag(!flag);
        }
    }, [value]);

    const [account, setAcccount] = useState("Connect Wallet");
    function getAddress(accountValue) {
        setAcccount(accountValue);
        window.localStorage.setItem('account', accountValue);
    }
    const [navbar, setNavbar] = useState(false);
    const location = useLocation();
    const [isOpened, setOpened] = useLocalStorage("isOpened", false);
    useEffect(() => {
        window.localStorage.setItem("isOpened", isOpened);
    }, [isOpened]);
    // console.log(isOpened);
    const [isOpen, setOpen] = useState(false);
    // localStorage.setItem("isOpen", isOpened);
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
    function ellipseAddress(address = "", width = 5) {
        return `${address.slice(0, width)}...${address.slice(-width)}`;
    }

    

    return (
        <>
            <Box className="flex justify-between px-6" style={{ height: "100px", width: "100%", background: "white" }}>
                <Box className="flex items-center">
                    <Link href="/">
                        <img src="../logo.png" alt="logo" />
                    </Link>
                </Box>
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
                                        <a style={{cursor: "default", pointerEvents: "none" }} href={item.url}>{item.name}</a>
                                    </StyleMenuItem>
                                })
                            }
                        </ul>
                    </Box>
                    }
                    <Box className="flex items-center">
                        <Box className="flex justify-center items-center" style={{ height: "56px", width: "211px" }}>
                            <div className="gradient pulse flex justify-center items-center" style={{ width: "100%", height: "100%" }}>
                                <div className="bg-white gradient-child flex justify-center items-center" style={{ width: "100%", height: "100%" }}>
                                    {!window.localStorage.getItem('account') ? <a style={{ textAlign: "center" }} onClick={() => handleOpen()} className="flex items-center connect-btn">{account}</a> :
                                        <a style={{ textAlign: "center" }} onClick={() => handleDisconnect()} className="flex items-center connect-btn">{ellipseAddress(window.localStorage.getItem('account'))}</a>
                                    }
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Hidden>
                <Hidden lgUp>
                    <Box className="flex items-center">
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
                                if (location.pathname == item.url)
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
            <Wallet open={isOpened} onClose={handleClose} getData={getAddress} />
            <Sign open={isOpen} onClose={handleSignClose} getName={getAddress} />
        </>
    );
}