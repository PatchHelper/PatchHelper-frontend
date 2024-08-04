import React from "react";

import { AboutImage } from "../img";
import { AboutCardData } from '../constants';
import InfoCard from "./InfoCard";

const About: React.FC = () => {
    return (
        <div id="about" className="flex flex-col gap-y-10 px-8 py-8 md:px-[11.25%]">
            <div id="title" className="w-full flex flex-col gap-y-6 md:flex-row justify-left md:justify-between items-center">
                <h2 className="boldheader2 text-text">About</h2>
                <p className="boldbasetext text-clr_primary">Find out more about this project <br/> and why it exists</p>
            </div>
            <div id="content" className="flex flex-col lg:flex-row justify-center items-center gap-x-10 gap-y-6 mx-6">
                <img draggable="false" src={AboutImage} alt="AboutImage" className="hidden md:flex md:max-w-96 lg:max-w-2xl" data-aos="fade-in"/>
                <div id="content-collumn" className="flex flex-col gap-y-8" data-aos="fade-up">
                    {AboutCardData.map((data, index) => (
                        <InfoCard key={index} title={data.title} content={data.content}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;