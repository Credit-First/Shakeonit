import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { TypographySize20 } from "../Typography/TypographySize";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ethers } from "ethers";
/// wallet connect///
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
/// end wallet connect ///

function Wallet({ open, onClose, getData }) {
    const [isOpn, setOpn] = useState(false);
    const handleCls = () => {
        setOpn(false);
    }
    const handleOpen = () => {
        setOpn(true);
        onClose();
    }
    // usetstate for storing and retrieving wallet details
    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });
    
    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {    
        // Asking if metamask is already present or not
        if (window.ethereum) {
    
        // res[0] for fetching a first wallet
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => accountChangeHandler(res[0]));
        } else {
        alert("Install metamask extension!!");
        }
    };
    
    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
    
        // Requesting balance method
        window.ethereum
        .request({ 
            method: "eth_getBalance", 
            params: [address, "latest"] 
        })
        .then((balance) => {
            // Setting balance
            setdata({
            Balance: ethers.utils.formatEther(balance),
            });
        });
    };
    
    // Function for getting handling all events
    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({ address: account, });
    
        getData(account);
 
        // Setting a balance
        getbalance(account);

        onClose();
    };

    /// wallet connect///
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0", // required
          },
        }
    };
    
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        displayNoInjectedProvider: true,
        disableInjectedProvider: true,
        providerOptions, // required
    });
    
    const connectWallet = async () => {
        onClose();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        await window.ethereum.send("eth_requestAccounts");
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        // Setting an address data
        setdata({ address: account, });
    };
    /// end wallet connect ///

    return (
        <>
            <Dialog
                onClose={onClose}
                open={open}
                maxWidth="xs"
                fullWidth
                className="relative"
            >
                <div className="absolute" style={{ top: "10px", right: "15px" }}><CloseIcon onClick={onClose} /></div>
                <div>
                    <div>
                        <div className="py-6">
                            <p className="flex justify-center wallet-lg">Connect Wallet</p>
                            <p className="flex justify-center wallet-md pt-2">To start using shakeoint</p>
                        </div>
                    </div>
                    <a className="flex justify-between mx-5 px-4 border-2 border-gray-200 vs-border-tip pulse" style={{ borderRadius: "8px" }} onClick={btnhandler} variant="primary">
                        <div className="flex">
                            <TypographySize20 className="flex items-center" style={{ color: "black" }}>MetaMask</TypographySize20>
                        </div>
                        <div className="flex items-center">
                            <img className="pr-2" src="../static/images/modal/01.png" alt="" />
                            <KeyboardArrowRightIcon />
                        </div>
                    </a>
                    <a className="flex justify-between mx-5 px-4 border-2 border-gray-200 mt-4 vs-border-tip-blue pulse" style={{ borderRadius: "8px" }} onClick={connectWallet}>
                        <div className="flex">
                            <TypographySize20 className="flex items-center" style={{ color: "black" }}>Wallet Connect</TypographySize20>
                        </div>
                        <div className="flex items-center">
                            <img className="pr-2" src="../static/images/modal/02.png" alt="" />
                            <KeyboardArrowRightIcon />
                        </div>
                    </a>
                    <div className="py-6 wallet-md px-9" style={{ textAlign: "center", lineHeight: "1.3" }}>
                        <span>By connecting your wallet, you agree to our </span><a href="/service" style={{ color: 'black' }}>Terms of Service </a><span>and our </span><a href="/privacypolicy" style={{ color: 'black' }}>Privacy Policy</a>
                    </div>
                </div>
            </Dialog>
        </>

    );
}

export default Wallet;