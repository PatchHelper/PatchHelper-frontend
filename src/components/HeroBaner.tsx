import React from "react";

import { HeroCard } from "../img";

const HeroBanner: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row bg-background self-strech items-center justify-center px-[32px] py-16 gap-y-12 md:px-[11.25%]">
        <div>
            <h1 className="boldheader1 shrink-0 text-text">
                Upgrade Your Game, <br/> Your Way
            </h1>
        </div>
        <div className="flex md:w-[32%]">
            <img 
              src={ HeroCard } 
              alt="HeroCard"
              className="flex flex-auto object-fill width-[316px] height-[348px]" 
            />
        </div>
    </div>
  );
};

export default HeroBanner;