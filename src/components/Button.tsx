import React from "react";
import { Link } from "react-router-dom";

type ButtonVariants = "primary" | "secondary" | "accent";
type FillVariants = "solid" | "outline";

interface ButtonProps {
    variant?: ButtonVariants;
    fill?: FillVariants;
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    link?: string;
}

const ButtonStyles = {
    "primary": {
        "solid": "bg-clr_primary text-text_secondary hover:opacity-70",
        "outline": "border border-clr_primary border-2 text-text hover:opacity-70",
    },
    "secondary": {
        "solid": "bg-clr_secondary text-text_secondary hover:opacity-70",
        "outline": "border border-clr_secondary border-2 text-text hover:opacity-70",
    },
    "accent": {
        "solid": "bg-clr_accent text-text_secondary hover:opacity-70",
        "outline": "border border-clr_accent border-2 text-text hover:opacity-70",
    },
};

const Button: React.FC<ButtonProps> = ({variant="primary", fill="solid", text, onClick= () => {}, type="button", className="", link}) => {
    return (
        <button className={`${ButtonStyles[variant][fill]} flex flex-row justify-center items-center p-4 text-basetext rounded-2xl align-middle ${className}`} type={type} onClick={onClick}>
            {link? <Link to={link}>{text}</Link>: text}
        </button>
    );
};

export default Button;