import React from "react";
import StatLabel from "./StatLabel";

const StatBar: React.FC = () => {
    return (
        <div className="w-full flex flex-col md:flex-row justify-between gap-y-12 px-[32px] md:px-[11.25%] bg-background2">
            <StatLabel variant="fill" type={0}/>
            <StatLabel variant="hollow" type={1}/>
            <StatLabel variant="fill" type={2}/>
        </div>
    );
};

export default StatBar;