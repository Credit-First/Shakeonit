import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Styled from "@mui/material/styles/styled";
import Avatar from "@material-ui/core/Avatar";
import { TypographySize48,TypographySize16, TypographySize14 } from "../../components/Typography/TypographySize";

const resources = [
    { id : "1", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "2", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "3", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "4", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "5", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "6", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." }
];

function Resources() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <div>
            <div className="privacy-bg">
                <TypographySize48 className="flex justify-center font-md-list pt-10 pb-4 lg:py-14">Resources for getting started</TypographySize48>
            </div>
            <div className="service-bg pb-20 lg:pb-28">
                <div className="mx-6 lg:mx-26 px-7 lg:p-12 py-12 rounded-[16px] lg:rounded-[24px] bg-white lg:bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {resources.map((resource) =>
                            <Grid
                                key={resource.id}
                                lg={12}
                                md={12}
                                xl={3}
                                xs={12}
                                className="border border-sky-400 mb-7 lg:mb-10 lg:mx-8 p-8 lg:p-12 rounded-lg text-xl connect-btn">
                                <Box className="flex">
                                    <Avatar className="mr-2 mb-2" style={{width: 24, height: 24}}>{resource.avatar}</Avatar>
                                    <TypographySize16>{resource.name}</TypographySize16>
                                </Box>
                                <TypographySize14>{resource.describe}</TypographySize14>
                            </Grid>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resources;