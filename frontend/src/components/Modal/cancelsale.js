import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ethers } from 'ethers'
import { contractAddress, contractAbi } from '../../content/contractMethods'

function CancelSale({ open, onClose, image }) {

    const cancelOrder = async () => {
        // ETHERS SETUP
        const ethereum = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum)

        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0]    // first account in MetaMask
        const signer = provider.getSigner(walletAddress)


        // ethers contract instantiation
        const shakeContract = new ethers.Contract(contractAddress, contractAbi, signer)
        // getActiveOrderLength 
        const orderActiveSet = shakeContract.getFromActiveOrderSet([1])

        await shakeContract.cancelOrderByAdmin([...orderActiveSet], {
            gasLimit: 250000
        }).then(res => {
            console.log(res)
        }
        )
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                fullWidth
                className="relative"
            >
                <div className="absolute" style={{ top: "10px", right: "15px" }}><CloseIcon onClick={onClose} /></div>
                <div>
                    <div className="flex justify-center py-5">
                        <img src={image} alt="" style={{width : "100px", height: "auto"}} />
                    </div>
                    <div className="flex justify-center px-4 md:px-12">
                        <p className="wallet-lg" style={{ textAlign: "center", lineHeight: '1.3' }}>Cancel Sale!</p>
                    </div>
                    <div className="flex justify-center px-2 md:px-6 my-4">
                        <p className="wallet-md" style={{ textAlign: "center", lineHeight: "1.3" }}>Please click the cancel button if you want to cancel sale.</p>
                    </div>
                    <div className="flex justify-center mx-6 border-2 border-gray-200 mb-5 mt-3 pulse">
                        <a className="welcome-btn1 py-3" onClick={() => {
                            cancelOrder();
                            onClose();
                            window.localStorage.clear();
                        }} href="/#/collections">Cancel</a>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CancelSale;