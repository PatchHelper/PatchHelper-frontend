import React from "react";
import StatLabel from "./StatLabel";

import Spacer from "./Spacer";

const StatBar: React.FC = () => {
    return (
        <div className="w-full flex flex-col">
            <Spacer variant={0} />
            <div className="w-full flex flex-col md:flex-row justify-between py-6 gap-y-8 px-[32px] md:px-[11.25%] bg-background2">
                <StatLabel variant="fill" type={0}/>
                <StatLabel variant="hollow" type={1}/>
                <StatLabel variant="fill" type={2}/>
            </div>
            <Spacer variant={1} />
        </div>
    );
};

export default StatBar;