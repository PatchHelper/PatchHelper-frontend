import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    variant?: "primary" | "secondary";
    fill?: "solid" | "outline";
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    link?: string;
}

const ButtonStyles = {
    "primary": {
        solid: "bg-clr_primary text-text_secondary",
        outline: "border border-clr_primary border-2 text-text",
    },
    "secondary": {
        solid: "bg-clr_secondary text-text_secondary",
        outline: "border border-clr_secondary border-2 text-text",
    },
};

const Button: React.FC<ButtonProps> = ({variant="primary", fill="solid", text, onClick= () => {}, type="button", className="", link}) => {
    return (
        <button className={`${ButtonStyles[variant][fill]} flex flex-row justify-center items-center p-4 text-basetext rounded-2xl align-middle ${className}`} type={type}>
            {link? <Link to={link}>{text}</Link>: text}
        </button>
    );
};

export default Button;