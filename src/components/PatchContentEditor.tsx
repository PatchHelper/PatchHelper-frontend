import React, { useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

import { PatchContentVariantsType, patchContent } from "../types";
import { TINYMCE_API_KEY } from "../constants";
import api from "../utils/api";

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

    const images_upload_handler = (blobInfo: any, progress: (percent: number) => void) => new Promise<string>((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        api.post('upload/', formData, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            if (response.status === 201 && response.data.url) {
                resolve(response.data.url);
            } else {
                reject(new Error("Failed to upload image"));
            };
        }).catch((error) => {
            console.error("Failed to upload image", error);
            reject(error);
        });
    });

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
                    'insertdatetime media table paste code help wordcount',
                    'image'
                ],
                toolbar:
                    'undo redo | image | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                image_title: true,
                file_picker_types: 'file image',
                images_upload_handler: images_upload_handler,
                }}
                onEditorChange={handleEditorChange}
            />
            }
        </div>
    );
};

export default PatchContentEditor;
