import React from "react";
import { Box } from "@mui/material";
import { TypographySize40, TypographySize20, TypographySize14 } from "../../components/Typography/TypographySize";
import { LastUpdate, HowCollect, HowUse, Updates, GeneralInformation, Sharing } from "../../content/content";

function PrivacyPolicy() {
    return (
        <div>
            <div className="privacy-bg">
                <TypographySize40 className="flex justify-center font-md-list pt-10 pb-4 lg:py-16">Privacy Policy</TypographySize40>
            </div>
            <div className="service-bg pb-20 lg:pb-28">
                <div className="mx-6 lg:mx-32 lg:mx-[22%] p-7 lg:p-12 rounded-[16px] lg:rounded-[24px] bg-white">
                    <Box>
                        <TypographySize20 className="pb-3">Last Updated: June 20, 2022</TypographySize20>
                        <TypographySize14 className="pb-3"> {LastUpdate}</TypographySize14>
                        <TypographySize20 className="pb-3">How we collect user data</TypographySize20>
                        <TypographySize14 className="pb-7">{HowCollect}</TypographySize14>
                    </Box>
                    <Box>
                        <TypographySize20 className="pb-3">How we use your data</TypographySize20>
                        <TypographySize14 className="pb-3"> Typically, we use your Personal Data to:</TypographySize14>
                        <TypographySize14 className="pb-3 pl-7 lg:pl-16">{HowUse}</TypographySize14>
                    </Box>
                    <Box>
                        <TypographySize20 className="pb-3">Sharing your data</TypographySize20>
                        <TypographySize14 className="pb-3 pl-7 lg:pl-16">{Sharing}</TypographySize14>
                    </Box>
                    <Box>
                        <TypographySize20 className="pb-3">General information</TypographySize20>
                        <TypographySize14 className="pb-3 pl-7 lg:pl-16">{GeneralInformation}</TypographySize14>
                    </Box>
                    <Box>
                        <TypographySize20 className="pb-3">Updates to this page</TypographySize20>
                        <TypographySize14 className="pb-3 pl-7 lg:pl-16">{Updates}</TypographySize14>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;