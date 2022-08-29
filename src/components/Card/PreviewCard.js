import React from "react";
import { TypographySize24, TypographySize20 } from "../Typography/TypographySize";
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';


function PreviewCard({ image, name, value }) {

    window.addEventListener("resize", onResizeFunction);

    function onResizeFunction(e) {
        const element = document.getElementById("elementwidth");
        const width = element.offsetWidth;
        element.style.height = parseInt(width * 0.85) + "px";
        const height = parseInt(width * 0.85) + "px"; 
        console.log(width, "width");
        console.log(height, "height");
    }

    useEffect(() => {
        const element = document.getElementById("elementwidth");
        const width = element.offsetWidth;
        element.style.height = parseInt(width * 0.85) + "px";
      }, []);




    return (
        <>
            <div className="previewcard" id="elementwidth">
                <img src={image} className="img" alt="" />
                <Box className="block md:flex justify-between mt-4 pl-3 md:pl-6 lg:pl-16 xl:px-2 text-24" style={{height : "10%"}}>
                    <p>{name}</p>
                    <p >USD &nbsp;&nbsp; {value}</p>
                </Box>
            </div>
        </>
    );
}

export default PreviewCard;