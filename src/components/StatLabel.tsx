import React from "react";
import axios from "axios";

import { LandingPageStat } from "../types";

interface StatLabelProps {
    variant?: "fill" | "hollow";
    type?: number;
};

const StatLabel: React.FC<StatLabelProps> = ({variant = "fill", type = 0}) => {
    const [data, setData] = React.useState<LandingPageStat>({value: 0, description: ""});

    React.useEffect(() => {
        axios.get<LandingPageStat[]>('http://localhost:8000/api/LandingPageStat/')
            .then((response) => {
                setData(response.data[type]);
            })
            .catch(error => {
                console.error('There was an error fetching the stats!', error);
            });
    }, [variant, type]);

    return (
        <div className="flex flex-col items-center justify-center gap-y-6">
            <h2 className={`boldheader2 ${variant==="fill" ? "text-clr_primary": "strokeStat"}`}>{data.value}</h2>
            <p className="semiboldheader4 font-poppins text-text text-center opacity-70">{data.description}</p>
        </div>
    );
};

export default StatLabel;