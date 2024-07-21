import React from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

import { PersonFill, Callendar } from "../img";

interface PatchOverviewProps {
    title: string;
    description: string;
    creator: {
        id: number;
        username: string;
    };
    created_at: string;
}

const PatchOverview: React.FC<PatchOverviewProps> = ({title, description, creator, created_at}) => {
    return (
        <div className="flex flex-row gap-x-4 p-6 bg-background2">
            {/* Add the post thumbnail here */}
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col align-middle"> 
                    <Link to={`/patches/${title}`}className="semiboldheader2 text-text">{title}</Link>
                    <div className="flex flex-row gap-x-4 text-clr_primary">
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <img src={PersonFill} alt="Person icon" className="w-4 h-4"/>
                            <Link to={`/profile/${creator.id}`}><p>{creator.username}</p></Link>
                        </div>
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <img src={Callendar} alt="Callendar icon" className="w-4 h-4"/>
                            <p>{format(new Date(created_at), 'dd-MM-yyyy')}</p>
                        </div>
                    </div>
                </div>
                <p className="basetext text-text">{description}</p>
            </div>
        </div>
    );
};

export default PatchOverview;