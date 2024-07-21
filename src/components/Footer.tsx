import React from "react";

import Spacer from "./Spacer";
import { FooterLinks } from "../constants";

const Footer: React.FC = () => {

    return (
        <footer className="w-full mt-auto">
            <Spacer variant={0}/> 
            <div className="flex flex-col gap-x-12 gap-y-6 md:flex-row justify-center pb-16 pt-8 px-8 md:px-[11.25%] bg-background2">
                <div className="flex flex-col gap-y-1">
                    <h3 className="text-text semiboldheader3 pb-1">Patch<span className="text-clr_primary">Helper</span></h3>
                    <p className="basetext text-text"><span className="text-clr_primary">@2024</span> All rights reserved</p>
                </div>
                {Object.keys(FooterLinks).map((key, index) => (
                    <div key={index} className="flex flex-col gap-y-1">
                        <h3 className="text-clr_primary semiboldheader3 pb-1">{key}</h3>
                        {FooterLinks[key].map((link, index2) => (
                            <a key={index2} href={link.id} className="basetext text-text">{link.label}</a>
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;