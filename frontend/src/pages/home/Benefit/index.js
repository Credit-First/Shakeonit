import React from "react";
import Image from "./image";
import OurBenefit from "./benefit";

function Benefit() {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <Image />
            <OurBenefit />
        </div>
    );
}

export default Benefit;