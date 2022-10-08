import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TypographySize40, TypographySize20, TypographySize16 } from "../../components/Typography/TypographySize";
import BoxCenter from "../../components/Box/BoxCenter";

function Shakeoint() {
    return (
        <Box className="px-4 md:px-12 lg:px-24 xl:px-72 py-6 md:py-24">
            <BoxCenter className="mb-4">
                <TypographySize40>Shakeoint brings value to...</TypographySize40>
            </BoxCenter>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={6}
                    xs={12}
                >
                    <TypographySize20>The Creator</TypographySize20>
                    <Box className="">
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <TypographySize16>Trade on your terms; return full custody of your assets</TypographySize16>
                    </Box>
                    <Box className=" pt-9">
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <TypographySize16>GEt feedback from potential collectors</TypographySize16>
                    </Box>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={6}
                    xs={12}
                >
                    <TypographySize20>The Fans</TypographySize20>
                    <Box>
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <TypographySize16>Buy cheaper and save on platform fees, 80% lower than OpenSea</TypographySize16>
                    </Box>
                    <Box className=" pt-9">
                        <img style={{ float: "left" }} className="pr-2" src="static/images/home/tick-circle.png" alt="" />
                        <TypographySize16>Chat and bargain with the seller</TypographySize16>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Shakeoint;