import React from "react";
import { Container } from "@mui/material";
import { TypographySize40, TypographySize242, TypographySize14 } from "../../components/Typography/TypographySize";

function Explore() {
    return (
        <>
            <TypographySize40 style={{display : "flex" , justifyContent : "start !important"}}>Explore Our Collections</TypographySize40>
            <div>
                <div className="grid grid-cols-1 lg:gap-6 lg:grid-cols-2">
                    <div className="flex justify-center">
                        <img className="img-radius" src="static/images/home/bakc4343.jpg" alt="" />
                    </div>
                    <div className="hidden lg:block">
                        <div>
                            <img className="ml-12 mb-4" src="static/images/home/top-ape.png" alt="" />
                        </div>
                        <div>
                            <img src="static/images/home/bottom-ape.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" pt-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="pb-3 lg:pb-0 border-b-2 lg:pr-6 lg:border-r-2 lg:border-b-0 border-color">
                        <TypographySize242>Bored Ape Yacht Club</TypographySize242>
                        <TypographySize14>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </TypographySize14>
                    </div>
                    <div className="pt-3 lg:pt-0 pb-3 lg:pb-0 lg:pl-6 lg:pr-6 border-b-2 lg:border-r-2 lg:border-b-0 border-color">
                        <TypographySize242>Azuki</TypographySize242>
                        <TypographySize14>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </TypographySize14>
                    </div>
                    <div className="pt-3 lg:pt-0 lg:pl-6">
                        <TypographySize242>Moonbirds</TypographySize242>
                        <TypographySize14>A Collection Of 10000 Disinterested-Looking Unique Ape
                            Portraits Living On The Ethereum Blockchain. This NFT Gives
                            You Exclusive Access To The Prestigious Bored Ape Yacht
                            Club Community.
                        </TypographySize14>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore;