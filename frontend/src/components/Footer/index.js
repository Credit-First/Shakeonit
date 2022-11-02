import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer({ isOpen, isOpened, setOpen, setOpened }) {
    const handleConnectWallet = () => {
        if (window.localStorage.getItem('account')) setOpen(true)
        else setOpen(false)
    }

    return (
        <div className="bg-[#ebf2f5] pt-10">
            <div className="w-full bg-[#2E3951] text-footer text-center text-xl px-[5%] py-6">
                <div className="my-4 flex items-center justify-center">
                    <a href="/">
                        <img className='w-16 h-16' src="../logo.svg" alt="footer" />
                    </a>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6 px-20 text-center sm:text-left lg:text-center" >
                    <a href="">Marketplace</a>
                    <a href="/#/resources">Resources</a>
                    <a href="/#/company">Company</a>
                    <a onClick={() => handleConnectWallet(true)}>Connect Wallet</a>
                    <a href="">Help</a>
                    <a href="/#/privacypolicy">Privacy Policy</a>
                </div>
                <div className="border-t border-gray-400 pb-4 mt-4" />
                <div className="flex flex-col md:flex-row items-center gap-y-4">
                    <div className="flex flex-1">
                        <p>© 2022 Shakeonit. All rights reserved</p>
                    </div>
                    <div className="flex gap-x-4">
                        <InstagramIcon />
                        <YouTubeIcon />
                        <TwitterIcon />
                        <FacebookIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}