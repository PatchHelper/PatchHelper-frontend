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
        <div className={`relative w-[105%] h-16 align-left ${variant % 2 === 0? "mb-[-2px]" : "mt-[-2px]"}`}>
            <div
                style={{backgroundImage: `url(${spacers[variant]})`}}
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave1 delay-0 z-[1000] bg-repeat-x"
            ></div>
            <div
                style={{backgroundImage: `url(${spacers[variant]})`}}
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave2 delay-[-5s] z-[1000] opacity-50 bg-repeat-x"
            ></div>
        </div>
    );
};

export default Spacer;