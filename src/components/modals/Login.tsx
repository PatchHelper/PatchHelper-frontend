import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { CloseMenu, PersonFillCircle } from "../../img";
import { Button, Login } from "../../components";

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
    return (
        <div className={`modal display-block ${props.show? "visible" : "hidden"}`}>
            <div className="modal-content items-center gap-y-4">
                <img src={CloseMenu} alt="Close Menu Icon" className="absolute right-4 top-4 w-6 h-6 cursor-pointer" onClick={props.onClose} />
                <div id="ModalTitle">
                    <h1 className="text-text boldheader4">Log-in</h1>
                </div>
                <Login />
            </div>
        </div>
    );
}

export default LoginModal;