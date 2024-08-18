import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { CloseMenu, PersonFillCircle } from "../../img";
import { Button } from "../../components";

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
    const currentPath = useLocation().pathname;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login/", {
                username: e.currentTarget.username.value,
                password: e.currentTarget.password.value,
            });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            console.log("User logged in:", response.data);
            navigate(currentPath);
            window.location.reload();

        } catch (error) {
            setError('Invalid username or password');
            console.error("Error registering user", error);
        }
    }

    return (
        <div className={`modal display-block ${props.show? "visible" : "hidden"}`}>
            <div className="modal-content items-center gap-y-4">
                <img src={CloseMenu} alt="Close Menu Icon" className="absolute right-4 top-4 w-6 h-6 cursor-pointer" onClick={props.onClose} />
                <div id="ModalTitle">
                    <h1 className="text-text boldheader4">Log-in</h1>
                </div>
                <div id="LoginContent" className="flex flex-col px-8 md:px-[11.25%] items-center my-auto w-full">
                    <div className="flex flex-col max-w-[320px] gap-y-6 rounded-2xl p-8 bg-background2 justify-center items-center">
                        <PersonFillCircle className="w-12 h-12"/>
                        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                            <div className="flex flex-col justify-start gap-y-1">
                                <label htmlFor="username" className="text-text text-textbase">Username</label>
                                <input type="text" id="username" name="username" placeholder="Username" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="flex flex-col justify-start gap-y-1">
                                <label htmlFor="password" className="text-text text-textbase">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            {error && <p className="text-text text-boldbasetext">{error}</p>}
                            <div className="flex flex-col justify-center items-center mt-2 gap-y-1 m-auto">
                                <Button text="Login" type="submit"/>
                                <p className="text-footertext text-text"><span className="opacity-70">Don't have an account yet? </span><Link to="/register" className="text-clr_primary opacity-70 hover:opacity-100">Register.</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;