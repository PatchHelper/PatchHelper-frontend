import React from "react";

const AsideBoxTitles = {
    "register": "Register",
    "statistics": "Statistics",
};

type AsideBoxTitlesKeys = keyof typeof AsideBoxTitles;

interface AsideBoxProps {
    variant: AsideBoxTitlesKeys;
};

const AsideBox: React.FC<AsideBoxProps> = ({variant}) => {
    let content;

    if (variant === "register") {
        content = <div className="flex flex-col">
            <p className="basetext text-text">It seems you don’t have an account yet. Create one now so you can download files or create forum posts!</p>
            {/* TODO: There will be a button here */}
        </div>
    } else if (variant === "statistics") {
        content = <>
            <div className="flex flex-row align-middle justify-between basetext">
                <p className="text-text opacity-70">Posts:</p>
                <p className="text-clr_primary">0</p>
            </div>
            <div className="flex flex-row align-middle justify-between basetext">
                <p className="text-text opacity-70">Images:</p>
                <p className="text-clr_primary">0</p>
            </div>
            <div className="flex flex-row align-middle justify-between basetext">
                <p className="text-text opacity-70">Online users:</p>
                <p className="text-clr_primary">0</p>
            </div>
            {/* TODO: Add api requests for these values */}
        </>
    } else {
        content = <p className="basetext text-text">There was an error loading the asidebox content!</p>
    };

    return (
        <div className="flex flex-col gap-y-2">
            <h3 className="semiboldheader3 text-text">{AsideBoxTitles[variant]}</h3>
            <div id="AsideBoxContent" className="flex flex-col gap-y-2 py-2 px-4 lg:px-6 bg-background2">
                {content}
            </div>
        </div>
    );
};

export default AsideBox;