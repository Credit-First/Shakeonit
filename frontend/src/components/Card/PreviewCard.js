import React from "react";
import Box from "@mui/material/Box";


function PreviewCard({ image, name, value }) {
    return (
        <>
            <div id="elementwidth">
                <div className="previewcard">
                    <img src={image} className="img rounded-xl" alt="" />
                    <Box className="block md:flex justify-between mt-4 pl-3 md:pl-6 lg:pl-16 xl:px-2 text-24" style={{ height: "10%" }}>
                        <p>{name}</p>
                        <p >USD &nbsp;&nbsp; {value}</p>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default PreviewCard;