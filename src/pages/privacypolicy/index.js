import React from "react";
import { Box } from "@mui/material";
import BoxCenter from "../../components/Box/BoxCenter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Styled from "@mui/material/styles/styled";
import { TypographySize40, TypographySize20, TypographySize14 } from "../../components/Typography/TypographySize";
import { LastUpdate, HowCollect, HowUse, Updates, GeneralInformation, Sharing } from "../../content/content";

// const ContentBox = Styled(Box)({
//     marginTop : "0.75rem",
//     marginBottom : "0.75rem"
// });
function PrivacyPolicy() {
    return (
        <>
            <Header />
            <Box className="privacy-bg">
                <Box className="pb-12">
                    <TypographySize40 className="py-12">Privacy Policy</TypographySize40>
                    <Box className="px-4 md:mx-10 lg:mx-20 xl:mx-80 py-8 md:px-12 rounded-xl bg-white">
                        <Box className="my-2">
                            <TypographySize20>Last Updated: June 20, 2022</TypographySize20>
                            <TypographySize14> {LastUpdate}</TypographySize14>
                            <TypographySize20>How we collect user data</TypographySize20>
                            <TypographySize14>{HowCollect}</TypographySize14>
                        </Box>
                        <Box>
                            <TypographySize20>How we use your data</TypographySize20>
                            <TypographySize14> Typically, we use your Personal Data to:</TypographySize14>
                            <TypographySize14 className="pl-16">{HowUse}</TypographySize14>
                        </Box>
                        <Box>
                            <TypographySize20>Sharing your data</TypographySize20>
                            <TypographySize14 className="pl-16">{Sharing}</TypographySize14>
                        </Box>
                        <Box>
                            <TypographySize20>General information</TypographySize20>
                            <TypographySize14 className="pl-16">{GeneralInformation}</TypographySize14>
                        </Box>
                        <Box>
                            <TypographySize20>Updates to this page</TypographySize20>
                            <TypographySize14 className="pl-16">{Updates}</TypographySize14>
                        </Box>
                        {/* </textarea> */}
                    </Box>

                    <Box className="absolute">
                        <img src="static/images/Vector-1.png" className="p-v-bg1" />
                        {/* <img src="static/images/Vector.png" className="p-v-bg2" /> */}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;