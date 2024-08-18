import React from "react";

import { CloseMenu } from "../../img";

interface CustomModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
    return (
        <div className={`modal display-block ${props.show? "visible" : "hidden"}`}>
            <div className="modal-content items-center gap-y-4">
                <img src={CloseMenu} alt="Close Menu Icon" className="absolute right-4 top-4 w-6 h-6 cursor-pointer" onClick={props.onClose} />
                <div id="ModalTitle">
                    <h1 className="text-text boldheader4">{props.title}</h1>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default CustomModal;