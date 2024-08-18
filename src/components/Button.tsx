import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    variant?: ButtonVariants;
    fill?: FillVariants;
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    link?: string;
    children?: React.ReactNode;
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
    "danger": {
        "solid": "bg-danger text-text_secondary hover:opacity-70",
        "outline": "border border-danger border-2 text-text hover:opacity-70",
    },
};

type ButtonVariants = keyof typeof ButtonStyles;
type FillVariants = keyof typeof ButtonStyles["primary"];

const Button: React.FC<ButtonProps> = ({variant="primary", fill="solid", text, onClick= () => {}, type="button", className="", link, children}) => {
    return (
        <button className={`${ButtonStyles[variant][fill]} flex flex-row gap-x-1 justify-center items-center align-middle p-4 text-basetext rounded-2xl ${className}`} type={type} onClick={onClick}>
            {children? children: null}
            {link? <Link to={link}>{text}</Link>: text}
        </button>
    );
};

export default Button;