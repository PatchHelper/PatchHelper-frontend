import React, { useState } from "react";

import { Plus } from "../img";
import { patchContent, PatchContentVariantsType } from "../types";
import { PatchContentElements, PatchContentVariants } from "../constants";

interface PatchContentSelectorProps {
    postContent: patchContent[];
    setPostContent: React.Dispatch<React.SetStateAction<patchContent[]>>;
}

const PatchContentSelector: React.FC<PatchContentSelectorProps> = (props: PatchContentSelectorProps) => {
    let [visible, setVisible] = useState<boolean>(false);
    
    const handleAddingContent = (variant: PatchContentVariantsType) => {
        props.setPostContent([...props.postContent, PatchContentElements[variant]]);
        setVisible(false);
    }
    
    return (
        <div className="flex flex-col items-center p-4 bg-background2 rounded-lg border-dashed border-2 border-text">
            <div className={`${visible? 'hidden' : 'visible'} flex flex-col items-center gap-y-1 cursor-pointer hover:opacity-70`} onClick={() => setVisible(true)}>
                <img src={Plus} alt="plus symbol icon" className="w-12 h-12"/>
                <p className="text-text">Add Content</p>
            </div>
            <div className={`${visible? 'visible' : 'hidden'} flex flex-wrap justify-center items-center gap-x-4`}>
            { PatchContentVariants.map((variant, index) => (
                <div key={index}>
                    {/* Add the component thumbnail here*/}
                    <p onClick={() => handleAddingContent(variant)} className="text-text cursor-pointer hover:opacity-70">{variant}</p>
                </div>
            )) }
            </div>
        </div>
    );
};

export default PatchContentSelector;