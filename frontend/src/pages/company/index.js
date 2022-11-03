import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BoxCenter from "../../components/Box/BoxCenter";
import Grid from "@mui/material/Grid";
import { TypographySize40, TypographySize14, TypographySize16 } from "../../components/Typography/TypographySize";

const companies = [
    { id: "1", avatar: "L", name: "Lorem Ipsum", describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis cras volutpat et lorem lobortis tortor." },
    { id: "2", avatar: "L", name: "Lorem Ipsum", describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis cras volutpat et lorem lobortis tortor." },
    { id: "3", avatar: "L", name: "Lorem Ipsum", describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis cras volutpat et lorem lobortis tortor." }
];

function Company() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <>
            <Box className="company-bg1">
                <center>
                    <Box className="mb-12">
                        <Box className="company-bg">
                            <Box className="text-company-header py-8">- Company -</Box>
                            <TypographySize40 className="pb-12">About Shakeonit</TypographySize40>
                        </Box>
                        <Box >
                            <Box className="text-content-sm px-4 md:px-32 lg:px-72">
                                <TypographySize14 style={{textAlign:"center"}}>
                                    NFTs are hot right now and have taken over the digital space, unique and limited digital commodities demonstrating ownership of digital art, in-game assets, music, and virtual lands on the blockchain. Everyone wants a piece as they unlock opportunities both in the physical world and the metaverse.<br></br><br></br>                                  
                                    We understand that popular NFT marketplaces don’t offer users the autonomy they crave. Often NFTs are minted, and the platform retains custody of these assets. Also, users are limited by rigid options like Bids and outright purchases.<br></br><br></br>                                  
                                    At Shakeonit, we want to change that by offering users more freedom to buy and sell NFT on their terms; they can negotiate with the sellers via chat and decide how much they are willing to pay for a collectible. Similarly, sellers can list their collections and be contacted by potential buyers; a sale is made once they an agreement is reached.<br></br>                                
                                    Our value<br></br>
                                    Shakeonit is the ultimate non-custodial peer-to-peer NFT marketplace, built for secondary sales. You keep your NFTs, list, or delist them at any time. Once listed on the platform, you enjoy up to 80% lower fees than OpenSea and industry-standard security. On top of that, you will get access to verified multichain collections and a seamless voice chat feature.
                                </TypographySize14>
                            </Box>
                        </Box>
                    </Box>
                </center>

                <Box className="px-4 md:px-32 lg:px-72 lg:px-32 grid grid-cols-1 xl:grid-cols-3 my-5">
                    <BoxCenter>
                        <img src="static/images/Vector 32.png" alt='' />
                    </BoxCenter>
                    <BoxCenter>
                        <img src="static/images/Vector 32.png" alt='' />
                    </BoxCenter>
                    <BoxCenter>
                        <img src="static/images/Vector 32.png" alt='' />
                    </BoxCenter>
                </Box>
                <BoxCenter className="px-4 md:px-32 lg:px-72 lg:px-32">
                    <Box className="pr-12">
                        <Box className="text-company mb-4">Lorem Ipsum</Box>
                        <Box className="text-blue">10,000</Box>
                    </Box>
                    <Box className="pl-12">
                        <Box className="text-company mb-4">Atributes</Box>
                        <Box className="text-blue">500</Box>
                    </Box>
                </BoxCenter>
                <Grid
                    container
                    justifyContent="center"
                    className="px-4 md:px-32 lg:px-72 lg:px-32 gap-12 py-6">
                    {companies.map((company) =>
                        <Grid
                            key={company.id}
                            item
                            lg={12}
                            md={12}
                            xs={12}
                            xl={3}
                            className="px-6 py-2 md:py-8 border-2 border-black-500 rounded-xl">
                            <Box className="flex mb-1 md:mb-3">
                                <Avatar className="mr-3">{company.avatar}</Avatar>
                                <TypographySize16 className="flex items-center">{company.name}</TypographySize16>
                            </Box>
                            <TypographySize14>{company.describe}</TypographySize14>
                        </Grid>

                    )}
                </Grid>
            </Box>
        </>
    );
}

export default Company;