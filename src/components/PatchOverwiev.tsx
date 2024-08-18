import React from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

import { Button } from "../components";
import { PersonFill, Callendar, Upvote, Trash, Edit } from "../img";
import { Patch } from "../types";

interface PatchOverviewProps {
    patch: Patch;
    editable?: boolean;
}

const PatchOverview: React.FC<PatchOverviewProps> = (props: PatchOverviewProps) => {
    return (
        <div className="flex flex-row gap-x-4 p-6 bg-background2">
            {/* TODO: Add the post thumbnail here */}
            <div className="flex flex-col gap-y-3 w-full">
                <div className="flex flex-col align-middle">
                    <div className="flex flex-row justify-between">
                        <Link to={`/patches/${props.patch.title}`}className="semiboldheader2 text-text">{props.patch.title}</Link>
                        <div className={`flex flex-row ${props.editable? "visible" : "hidden"} gap-x-2`}>
                            {/* TODO: Add functionality */}
                            { props.editable && <Button text="Edit" variant="accent" fill="outline" className="max-h-10 max-w-15"><Edit className="w-4 h-4"/></Button> }
                            { props.editable && <Button text="Delete" variant="danger" fill="solid" className="max-h-10 max-w-15"><Trash className="w-4 h-4"/></Button>  }
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-4 text-clr_primary">
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <PersonFill className="w-4 h-4"/>
                            <Link to={`/profile/${props.patch.user.id}`}><p>{props.patch.user.username}</p></Link>
                        </div>
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <Callendar className="w-4 h-4"/>
                            <p>{format(new Date(props.patch.created), 'dd-MM-yyyy')}</p>
                        </div>
                        <div className="flex flex-row gap-x-1 items-center justify-center">
                            <Upvote className="w-4 h-4"/>
                            <p>{props.patch.upvotes} upvotes</p>
                        </div>
                    </div>
                </div>
                <p className="basetext text-text">{props.patch.description}</p>
            </div>
        </div>
    );
};

export default PatchOverview;