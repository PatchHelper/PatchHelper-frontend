import React from "react";
import { InstructionImage } from "../img";
import { InstructionsData } from "../constants";

const Instructions: React.FC = () => {
    return (
        <div id="instructions" className="flex flex-col justify-center gap-y-10 px-8 py-4 md:px-[11.25%]">
            <div className="w-full flex flex-row justify-center">
                <h2 className="boldheader2 text-text">How to use</h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-y-6 gap-x-10">
                <div className="flex flex-col justify-center align-middle items-center max-w-96 gap-y-2 p-7 bg-background2 rounded-3xl" data-aos="fade-up">
                    {InstructionsData.map((instruction, index) => (
                        <p key={index} className="instruction text-text w-full">
                            {instruction}
                        </p>
                    ))}
                    <p className="text-text w-full">Enjoy your patched game. <span className="boldbasetext text-text">That’s it!</span></p>
                </div>
                <img draggable="false" src={InstructionImage} alt="InstructionImage" className="hidden md:flex md:max-w-96 lg:max-w-2xl" data-aos="fade-in"/>
            </div>
        </div>
    );
};

export default Instructions;