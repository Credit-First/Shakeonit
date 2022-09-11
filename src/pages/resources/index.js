import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Styled from "@mui/material/styles/styled";
import Avatar from "@material-ui/core/Avatar";
import { TypographySize48,TypographySize16, TypographySize14 } from "../../components/Typography/TypographySize";

const ContainerBox = Styled(Box)({
    display : "flex",
    alignItems : "center",
    position: "relative",
    minHeight: "100vh"
});
const GridStyle = Styled(Grid)({
    paddingLeft : "2.5rem",
    paddingRight : "1rem",
    marginTop : "32px"
});

const resources = [
    { id : "1", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "2", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "3", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "4", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "5", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." },
    { id : "6", avatar: "", name: "Lorem Ipsum", describe: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Turpis Cras Volutpat Et Lorem Lobortis Tortor." }
];

function Resources() {
    return (
        <ContainerBox>
            <Box className="company-bg1">
                <center className="resources-bg">
                    <TypographySize48 className="pb-12">Resources for getting started</TypographySize48>
                </center>

                <GridStyle alignItems="center"
                    container
                    justifyContent="center"
                    spacing={3}
                    className="mb-12 gap-4 xl:gap-6">
                    {resources.map((resource) =>
                        <Grid
                            key={resource.id}
                            item
                            lg={12}
                            md={12}
                            xl={3}
                            xs={12}
                            className="border border-sky-400 px-8 py-8 mx-3 my-2 rounded-lg text-xl connect-btn">
                            <Box className="flex">
                                <Avatar className="mr-3">{resource.avatar}</Avatar>
                                <TypographySize16>{resource.name}</TypographySize16>
                            </Box>
                            <TypographySize14>{resource.describe}</TypographySize14>
                        </Grid>
                    )}
                </GridStyle>
            </Box>
        </ContainerBox>
    );
}

export default Resources;