import React from "react";
import { Box } from "@mui/material";
import BoxCenter from "../../../components/Box/BoxCenter";
import { TypographySize40, TypographySize242 } from "../../../components/Typography/TypographySize";

function OurBenefit() {
    return (
        <Box className="flex items-center">
            <Box>
                <BoxCenter>
                    <TypographySize40>Our Benefits</TypographySize40>
                </BoxCenter>
                <Box className="mx-3 lg:mx-10 my-10">
                    <Box className="relative" style={{ float: "left" }}>
                        <img src="static/images/home/Group 4460.png" alt="" />
                        <img style={{ position: "absolute", top: "25px", left: "25px" }} src="static/images/home/ranking.png" alt="" />
                    </Box>

                    <Box className="flex items-center pl-9">
                        <Box>
                            <TypographySize242>Low Fees</TypographySize242>
                            <p className="text-sell-sm">We Offer One Of The Lowest Platform Fees In The Industry</p>
                        </Box>
                    </Box>
                </Box>
                <Box className="mx-3 lg:mx-10 my-10">
                    <Box className="relative" style={{ float: "left" }}>
                        <img src="static/images/home/Group 4460.png" alt="" />
                        <img style={{ position: "absolute", top: "25px", left: "25px" }} src="static/images/home/lamp-charge.png" alt="" />
                    </Box>
                    <Box className="flex items-center pl-9">
                        <Box>
                            <TypographySize242>Chat with prospects </TypographySize242>
                            <p className="text-sell-sm">Voice or text, you choose. Chat with potential collectors, and get feedback</p>
                        </Box>
                    </Box>
                </Box>
                <Box className="mx-3 lg:mx-10 my-10">
                    <Box className="relative" style={{ float: "left" }}>
                        <img src="static/images/home/Group 4460.png" alt="" />
                        <img style={{ position: "absolute", top: "25px", left: "25px" }} src="static/images/home/home-trend-up.png" alt="" />
                    </Box>
                    <Box className="flex items-center pl-9">
                        <Box>
                            <TypographySize242>Multichain Support </TypographySize242>
                            <p className="text-sell-sm">List and explore collectibles across several blockchains</p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default OurBenefit;