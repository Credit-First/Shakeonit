import React from "react";
import Grid from "@mui/material/Grid";
import { TypographySize40, TypographySize242, TypographySize14 } from "../../components/Typography/TypographySize";

function NFT() {
    return (
        <Grid
            container
        >
            <Grid
                item
                lg={4}
                md={12}
                xl={4}
                xs={12}
                className="flex items-center"
            >
                <div>
                    <img src="/static/images/home/Vector 19.png" alt="vector" className="pb-3" />
                    <TypographySize40 className="flex justify-start pb-12 lg:pb-32">Sell your NTFs</TypographySize40>
                </div>
            </Grid>
            <Grid
                item
                lg={8}
                md={12}
                xl={8}
                xs={12}
            >
                <div className="">
                    <div className="gap-0 lg:gap-10 grid grid-cols-1 lg:grid-cols-2">
                        <div>
                            <div className="mx-3 md:mx-6 lg:mx-0 border-2 text-justify p-6 rounded-xl bg-white">
                                <div className="relative">
                                    <img src="static/images/home/Ellipse 17.png" alt="" />
                                    <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                </div>
                                <TypographySize242 >Connect your wallet</TypographySize242>
                                <TypographySize14>After You've Setup A Compatible Wallet,
                                    Connect To Shakeoint By Trading The Connect
                                    Wallet Button On The Top Right Corner.
                                </TypographySize14>
                            </div>
                            <div className="mx-3 md:mx-6 lg:mx-0 border-2 text-justify p-6 mt-10 rounded-xl bg-white">
                                <div className="relative">
                                    <img src="static/images/home/Ellipse 17.png" alt="" />
                                    <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                </div>
                                <TypographySize242 >Connect your wallet</TypographySize242>
                                <TypographySize14>After You've Setup A Compatible Wallet,
                                    Connect To Shakeoint By Trading The Connect
                                    Wallet Button On The Top Right Corner.
                                </TypographySize14>
                            </div>
                        </div>
                        <div>
                            <div className="mx-3 md:mx-6 lg:mx-0 border-2 text-justify p-6 my-10 rounded-xl bg-white">
                                <div className="relative">
                                    <img src="static/images/home/Ellipse 17.png" alt="" />
                                    <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                </div>
                                <TypographySize242 >Connect your wallet</TypographySize242>
                                <TypographySize14>After You've Setup A Compatible Wallet,
                                    Connect To Shakeoint By Trading The Connect
                                    Wallet Button On The Top Right Corner.
                                </TypographySize14>
                            </div>
                            <div className="mx-3 md:mx-6 lg:mx-0 border-2 text-justify p-6 my-10 rounded-xl bg-white">
                                <div className="relative">
                                    <img src="static/images/home/Ellipse 17.png" alt="" />
                                    <img className=" " style={{ position: "absolute", top: "12px", left: "12px" }} src="static/images/home/empty-wallet.png" alt="" />
                                </div>
                                <TypographySize242 >Connect your wallet</TypographySize242>
                                <TypographySize14>After You've Setup A Compatible Wallet,
                                    Connect To Shakeoint By Trading The Connect
                                    Wallet Button On The Top Right Corner.
                                </TypographySize14>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default NFT;