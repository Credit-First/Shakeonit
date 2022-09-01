import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function CancelSale({ open, onClose, image }) {
    const [isOpened, setOpened] = useState(false);
    const handleClose = () => {
        setOpened(false);
    }
    const handleOpen = () => {
        onClose();
        setOpened(true);
    }

    const account = "Connect Wallet";
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
                            onClose();
                            window.localStorage.clear();
                        }} href="/collections">Cancel</a>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CancelSale;