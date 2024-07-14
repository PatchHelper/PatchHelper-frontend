import React from "react";

interface ButtonProps {
    variant?: "primary" | "secondary";
    fill?: "solid" | "outline";
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
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

const Button: React.FC<ButtonProps> = ({variant="primary", fill="solid", text, onClick= () => {}, type="button", className=""}) => {
    return (
        <button className={`${ButtonStyles[variant][fill]} flex flex-row justify-center items-center p-4 text-basetext rounded-2xl align-middle ${className}`} type={type}>
            {text}
        </button>
    );
};

export default Button;