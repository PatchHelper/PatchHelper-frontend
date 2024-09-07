import React, { useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

import { PatchContentVariantsType, patchContent } from "../types";
import { TINYMCE_API_KEY } from "../constants";

interface PatchContentProps {
    index: number;
    type: PatchContentVariantsType;
    content: patchContent[];
    setContent: React.Dispatch<React.SetStateAction<patchContent[]>>;
    order: number;
}

const PatchContentEditor: React.FC<PatchContentProps> = ({index, type = "textField", content, setContent=()=>"", order}) => {
    const contentIndex = type === "textField" ? "text" : "images"; 
    const [elementContent, setElementContent] = useState<any>(content[index][contentIndex]);
    content[index]["order"] = order;

    const handleEditorChange = (elementContent: string) => {
        if (!(type === "textField")) { return }; // Handle only text fields

        setElementContent(elementContent);
        content[index]["text"] = elementContent.toString();
        // content[index]["images"] = [];
        setContent(content)
    }

    return (
        <div className="flex flex-col align-middle justify-start gap-y-3 p-4 bg-background2 text-text">
            {(type === "textField") && 
            <Editor
              apiKey={TINYMCE_API_KEY}
              value={elementContent}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
            />
            }
        </div>
    );
};

export default PatchContentEditor;
