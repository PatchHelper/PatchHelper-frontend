import React from "react";
import { PatchContentVariantsType} from "../types";

interface PatchContentProps {
    type: PatchContentVariantsType;
    content: any;
}

const PatchContent: React.FC<PatchContentProps> = ({type = "textField", content}) => {
    return (
        <div className="flex flex-col align-middle justify-start gap-y-3 p-4 bg-background2 text-text">
            {(type === "textField") && 
            <div
              dangerouslySetInnerHTML={ { __html: content.text } }>
            </div>
            }
        </div>
    );
};

export default PatchContent;
