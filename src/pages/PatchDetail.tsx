import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';

import { fetchPatch } from "../services/patchService";
import { Patch } from "../types";
import { PersonFill, Callendar } from "../img";

const PatchDetail: React.FC = () => {
    const { title } = useParams<{ title: string}>();
    const [patch, setPatch] = useState<Patch | null>(null);

    useEffect(() => {
        if (!title) {
            console.error("No title provided in URL");
            return;
        }
        const fetchPatchData = async () => {
            const response = await fetchPatch(title);

            if (response.status !== 200) {
                console.error("Error fetching patch data");
                return;
            }
            setPatch(response.data);
        };

        fetchPatchData();

    }, [title]);

    if (!patch) {
        return (
            <div>
                <h1>Loading...</h1> 
            </div>
            // TODO: Create a loading spinner component
        );
    }

    return (
        <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
            <div id="TitleBar" className="flex flex-row gap-x-8">
                {/* TODO: Add an thumbnail component here */}
                <div id="PatchInfo" className="flex flex-col gap-y-3">
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                        <h2 className="semiboldheader3 md:semiboldheader2 text-text">{title}</h2>
                        <h2 className="semiboldheader3 md:semiboldheader2 text-text opacity-70">0.0.0 </h2> {/* TODO: Add version to patch model */}
                    </div>
                    <div className="flex flex-col md:flex-row text-text gap-x-3 gap-y-3">
                        <div className="flex flex-row gap-x-1 items-center justify-center">
                            <img src={PersonFill} alt="Person icon" className="w-4 h-4"/>
                            <Link to={`/profile/${patch.user.id}`}><p>{patch.user.username}</p></Link>
                        </div>
                        <div className="flex flex-row gap-x-1 items-center justify-center">
                            <img src={Callendar} alt="Callendar icon" className="w-4 h-4"/>
                            <p>{format(new Date(patch.created), 'dd-MM-yyyy')}</p>
                        </div>
                        {/* TODO: Add download stat */}
                    </div>
                </div>
            </div>
            <div id="Description" className="flex flex-col gap-y-3">
                <h3 className="semiboldheader3 text-clr_primary">Description</h3>
                <div className="flex flex-col align-middle justify-start gap-y-3 p-4 bg-background2 text-text">
                    {patch.content.toString()} {/* TODO: Create a patch content display component*/}
                </div>
            </div>
            <div id="Download" className="flex flex-col gap-y-3">
                <h3 className="semiboldheader3 text-clr_primary">Download</h3>
                {/* TODO: Create button components for stable, latest and beta releases */}
            </div>
        </main>
    );
};

export default PatchDetail;