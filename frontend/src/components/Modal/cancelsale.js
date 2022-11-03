import { Dialog } from "@material-ui/core";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ethers } from 'ethers'
import Config from '../../config/app';

function CancelSale({ open, onClose, image, nonce }) {
    const navigate = useNavigate();
    const [cancelOrderLodaing, setCancelOrderLoading] = useState(0);

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
        const shakeContract = new ethers.Contract(Config.shakeonit.address, Config.shakeonit.abi, signer)
        // getActiveOrderLength 
        setCancelOrderLoading(1)
        shakeContract.cancelOrder(nonce).then(res => {
            navigate("/collections");
            console.log(res)
        }).then(() => {
            console.log('success')
        }).catch(() => {
            setCancelOrderLoading(0)
        })
        const _nonce = nonce;
        shakeContract.on('CancelOrder', (nonce) => {
			if (nonce === _nonce) {
				setCancelOrderLoading(0)
			}
		})
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
                        <img src={image} alt="" style={{width : "100px", height: "auto"}} className="rounded-[10px]" />
                    </div>
                    <div className="flex justify-center px-4 md:px-12">
                        <p className="wallet-lg" style={{ textAlign: "center", lineHeight: '1.3' }}>Cancel Sale!</p>
                    </div>
                    <div className="flex justify-center px-2 md:px-6 my-4">
                        <p className="wallet-md" style={{ textAlign: "center", lineHeight: "1.3" }}>Please Click The Cancel Button If You Want To Cancel Sale.</p>
                    </div>
                    <div className="flex justify-center mx-6 border-2 border-gray-200 mb-5 mt-3 pulse rounded-[10px]">
                        <div className="cursor-pointer welcome-btn1 py-3 w-full h-full text-center" onClick={() => {
                            cancelOrder();
                            onClose();
                            window.localStorage.clear();
                        }}>Cancel</div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CancelSale;