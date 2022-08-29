import React from "react";
import { Box } from "@mui/material";
import BoxCenter from "../../../components/Box/BoxCenter";

function Image() {
    return (
        <BoxCenter className="relative">
            <img src="static/images/home/Rectangle 37 (2).png" alt="" />
            <Box className="hidden lg:block absolute" style={{ position: "absolute", top: "8%", right: "10%" }}>
                <img src="static/images/home/Rectangle 43.png" alt="" />
            </Box>
            <Box className="hidden lg:block absolute" style={{ top: "44%", right: "6%" }}>
                <img src="static/images/home/Rectangle 39.png" alt="" />
            </Box>
            <Box className="hidden lg:block absolute" style={{ left: "10%" }}>
                <img src="static/images/home/Rectangle 44.png" alt="" />
            </Box>
        </BoxCenter>
    );
}

export default Image;