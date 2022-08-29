import React from "react";
import Carousel from "./carousel";
import Terms from "./terms"

function Buy() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <Carousel />
            <Terms />    
        </div>
    )
}

export default Buy;