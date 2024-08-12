import React, { useState } from "react";

import { CloseMenu } from "../../img";
import { Button } from "../../components";

interface ShareModalProps {
    show: boolean;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = (props: ShareModalProps) => {
    const [showCopied, setShowCopied] = useState<boolean>(false);
    const currentPath = window.location.href;

    function copyToClipboard() {
        navigator.clipboard.writeText(currentPath);
        setShowCopied(true);
        setTimeout(() => {setShowCopied(false)}, 2000);
    }

    return (
        <div className={`modal display-block ${props.show? "visible" : "hidden"}`}>
            <div className="modal-content items-center gap-y-4">
                <img src={CloseMenu} alt="Close Menu Icon" className="absolute right-4 top-4 w-6 h-6 cursor-pointer" onClick={props.onClose} />
                <div id="ShareTitle">
                    <h1 className="text-text boldheader4">Share</h1>
                </div>
                <div id="ShareContent" className="w-full px-5 py-2">
                    <div id="ShareLink" className="flex flex-row gap-x-4 items-center">
                        <input type="text" className="bg-background w-full text-text p-2 rounded-md border-text border-2 border-dashed focus:border-clr_primary focus:border-solid outline-none" value={currentPath} readOnly/>
                        <Button text="Copy" variant="primary" className="h-12" onClick={copyToClipboard}/>
                    </div>
                    <p className={`right-[1.25rem] fixed text-clr_primary footertext ${showCopied? "visible" : "hidden"}`}>Copied to clipboard!</p>
                </div>
            </div>
        </div>
    );
}

export default ShareModal;