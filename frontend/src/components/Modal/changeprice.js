import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CloseIcon from '@mui/icons-material/Close';

function ChangePrice({ open, onClose, image, price, setPrice, coinPrice, setPriceValue, handleFlag, handleChangeFlag }) {
    const [isErrorprice, setErrorPrice] = useState(false);
    const handleChangePrice = (e) => {
        const re = /^[0-9\b.]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPrice(e.target.value);
            setPriceValue(e.target.value/coinPrice);
            setErrorPrice(false);
            handleFlag()
        }
        else {
            setErrorPrice(true);
        }
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
                        <img src={image} alt="" style={{ width: "100px", height: "auto" }} />
                    </div>
                    <div className="flex justify-center px-4 md:px-12">
                        <p className="wallet-lg" style={{ textAlign: "center", lineHeight: '1.3' }}>Change Price!</p>
                    </div>
                    <Box>
                        <Box className="TextField-without-border-radius mx-6 my-3">
                            <TextField
                                fullWidth
                                name="content"
                                variant="outlined"
                                onChange={handleChangePrice}
                                value={price}
                                placeholder="0"
                            />
                        </Box>
                        {isErrorprice ?
                            <span className='text-red-400 text-md error flex justify-end'>You must input only integer</span> : null
                        }
                    </Box>
                    <div className="flex justify-center px-2 md:px-6 my-4">
                        <div>
                            <p className="wallet-sm" style={{ textAlign: "center", lineHeight: "1.3" }}>Please input the price if you want to Change Price.</p>
                            <p className="wallet-sm" style={{ textAlign: "center", lineHeight: "1.3" }}>Please click the cancel button if you don't want to change price</p>
                        </div>
                    </div>
                    <div className="flex justify-around mx-6 mb-5 mt-3">
                        <div className="cursor-pointer welcome-btn1 p-3 border-2 border-gray-200 pulse rounded-[10px]" onClick={() => {
                            onClose();
                            handleChangeFlag();
                        }}>Change Price</div>
                        <div className="cursor-pointer welcome-btn1 p-3 border-2 border-gray-200 pulse rounded-[10px]" onClick={() => {
                            onClose();
                            handleFlag();
                        }}>Cancel</div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default ChangePrice;