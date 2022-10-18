import React from "react";
import Box from "@mui/material/Box";


function PreviewCard({ image, name, value }) {
    return (
        <>
            <div id="elementwidth">
                <div className="previewcard">
                    <img src={image} className="img rounded-xl" alt="" />
                    <Box className="overflow-auto mt-4 pl-3 md:pl-6 lg:pl-16 xl:px-2 text-24" style={{ height: "10%" }}>
                        <div className="float-left">{name}</div>
                        <div className="float-right clear-left text-lg font-bold flex items-end">
                            <span className="mr-2">USD</span>
                            <span className="text-2xl">{value}</span>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default PreviewCard;