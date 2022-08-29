import React from "react";
import { TypographySize481, TypographySize24 } from "../../../components/Typography/TypographySize";
import "../../../assets/scss/customize.scss";

function Terms() {
    return (
        <div className="mx-3 md:mx-12 mb-32 lg:mx-16 mt-32">
            <div className="flex justify-center">
                <img src="static/images/home/Group95.png" alt="" />
            </div>
            <div className=" mt-4 px-6">
                <TypographySize481>Buy And Sell NFTs On Your Terms</TypographySize481>
                <TypographySize24 className="mt-3">
                    Shakeoint is The No 1 Secondary Marketplace For NFTs. Buy And Sell NFTs Directly With Anyone; Just 
                    Shake On It And Trade
                </TypographySize24>
            </div>
            <div className="mt-6 px-6">
                <a href="/collections" className="btn px-5 py-3 pulse" style={{width : "30%"}}>Make a Trade</a>
            </div>
        </div>
    )
}

export default Terms;