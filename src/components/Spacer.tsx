import React from "react";

import { ImageSpacer1, ImageSpacer2 } from "../img";

interface spacer_props {
    variant: number;
}

const spacers = [
    ImageSpacer1,
    ImageSpacer2,
];

const Spacer: React.FC<spacer_props> = ({variant}) => {
    return (
        <div className={`w-[105%] h-16 align-left ${variant % 2 === 0? "mb-[-2px]" : "mt-[-2px]"}`}>
            <img 
                src={spacers[variant]}
                alt="spacerImage"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Spacer;