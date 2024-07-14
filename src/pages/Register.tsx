import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { PersonFillCircle } from "../img";
import { Button } from "../components";

const Register: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/register/", {
                username: e.currentTarget.username.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            });
            console.log("User registered", response);
            navigate('/login');
        } catch (error) {
            console.error("Error registering user", error);
        }
    }

    return (
        <main className="flex flex-col px-8 md:px-[11.25%] items-center my-auto">
            <div className="flex flex-col max-w-[320px] gap-y-6 rounded-2xl p-8 bg-background2 justify-center items-center">
                <img src={PersonFillCircle} alt="PersonFillCircle icon" className="w-12 h-12"/>
                <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-start gap-y-1">
                        <label htmlFor="username" className="text-text text-textbase">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-col justify-start gap-y-1">
                        <label htmlFor="email" className="text-text text-textbase">Email adress</label>
                        <input type="email" id="email" name="email" placeholder="Email adress" className="inputField" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col justify-start gap-y-1">
                        <label htmlFor="password" className="text-text text-textbase">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-2 gap-y-1 m-auto">
                        <Button text="Register" type="submit"/>
                        <p className="text-footertext text-text"><span className="opacity-70">Already have an account? </span><Link to="/login" className="text-clr_primary opacity-70 hover:opacity-100">Log In.</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Register;