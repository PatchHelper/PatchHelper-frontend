import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { PatchContentEditor, PatchContentSelector } from "../components";

import api from "../utils/api";
import { PersonFill, Callendar } from "../img";
import { patchContent, User } from "../types";
import { getCurrentUser } from "../services/profileService";
import { Button } from "../components";

const PatchCreate: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [title, setTitle] = useState<string>("Patch Title");
    const [description, setDescription] = useState<string>("Enter the patch description here");
    const [version, setVersion] = useState<string>("1.0.0");
    const [content, setContent] = useState<patchContent[]>([]);
    const created = new Date();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getCurrentUser();

            if (response) {
                setUser(response);
            }
    };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formData = new FormData();
        // console.log(formData);
        // formData.append('title', title);
        // formData.append('description', description);
        // formData.append('version', version);
        // formData.append('content', content);
        // formData.append('created', created.toISOString());
        // formData.append('updated', updated.toISOString());

        const patch = {
            title: title,
            version: version,
            description: description,
            content: content,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
        }

        console.log('Patch data', patch);

        const response = await api.post("/patches/new/", 
            patch,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Patch sent to api", response);
};

    return (
        <main>
            <form className="flex flex-col gap-y-8 px-8 md:px-[11.25%]" onSubmit={handleSubmit}>
                <div id="TitleBar" className="flex flex-row gap-x-8">
                    {/* TODO: Add an thumbnail component here */}
                    <div id="PatchInfo" className="flex flex-col gap-y-3">
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                            <input className="semiboldheader3 md:semiboldheader2 text-clr_primary bg-background border-2 border-dashed border-text rounded-lg p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input className="semiboldheader3 md:semiboldheader2 text-text opacity-70 bg-background max-w-24 border-2 border-dashed border-text rounded-lg p-2" value={version} onChange={(e) => setVersion(e.target.value)}/>
                        </div>
                        <div className="flex flex-col md:flex-row text-text gap-x-3 gap-y-3">
                            <div className="flex flex-row gap-x-1 items-center justify-center">
                                <img src={PersonFill} alt="Person icon" className="w-4 h-4"/>
                                <Link to={`/profile/${user.id}`}><p className="text-text cursor-pointer hover:opacity-70">{user.username}</p></Link>
                            </div>
                            <div className="flex flex-row gap-x-1 items-center justify-center">
                                <img src={Callendar} alt="Callendar icon" className="w-4 h-4"/>
                                <p>{format(created, 'dd-MM-yyyy')}</p>
                            </div>
                            {/* TODO: Add download stat */}
                        </div>
                    </div>
                </div>
                <div id="Description" className="flex flex-col gap-y-3">
                    <h3 className="semiboldheader3 text-clr_primary">Description</h3>
                    <input className="text-base text-text bg-background2 p-2 border-2 border-dashed border-text rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div id="Content" className="flex flex-col gap-y-3">
                    <h3 className="semiboldheader3 text-clr_primary">Content</h3>
                    <div className="flex flex-col gap-y-2">
                        {
                            content.map((element, index) => (
                                <PatchContentEditor key={index} index={index} type={element.type} content={content} setContent={setContent} order={index}/>
                            ))
                        }
                        <PatchContentSelector postContent={content} setPostContent={setContent}/>
                    </div>
                </div>
                <div id="Download" className="flex flex-col gap-y-3">
                    <h3 className="semiboldheader3 text-clr_primary">Download</h3>
                    {/* TODO: Create button components for stable, latest and beta releases */}
                </div>
                <Button text="Submit changes" type="submit"/>
            </form>
        </main>
    );
};

export default PatchCreate;