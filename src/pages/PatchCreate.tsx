import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format, set } from "date-fns";

import { PatchContentEditor, PatchContentSelector, Loading, CustomModal } from "../components";

import api from "../utils/api";
import { PersonFill, Callendar, Placeholder } from "../img";
import { patchContent, User, PatchStatesType } from "../types";
import { PatchStates } from "../constants";
import { getUserDetails } from "../services/profileService";
import { fetchPatch, fetchPatchContent } from "../services/patchService";
import { Button } from "../components";

const PatchCreate: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [user, setUser] = useState<User>();
    const [title, setTitle] = useState<string>("Patch Title");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [description, setDescription] = useState<string>("Enter the patch description here");
    const [version, setVersion] = useState<string>("1.0.0");
    const [content, setContent] = useState<patchContent[]>([]);
    const [patchState, setState] = useState<PatchStatesType>("draft");
    const created = new Date();

    // Modal controlls
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("Patch sucesfully created");
    const [modalContent, setModalContent] = useState<string>("Your patch has been created successfully, you can now exit this page.");
    const [modalError, setModalError] = useState<string>("");

    const fetchUser = async () => {
        const response = await getUserDetails();

        if (response) {
            setUser(response.data);
        }
    };

    const fetchPatchData = async (patch_uuid: string) => {
        const patch_response = await fetchPatch(patch_uuid);

        if (patch_response.status !== 200) {
            console.error("Error fetching patch data");
            return;
        }
        
        setTitle(patch_response.data.title);
        setThumbnailPreview(patch_response.data.thumbnail);
        setVersion(patch_response.data.version);
        setDescription(patch_response.data.description);
        setVersion(patch_response.data.version);

        const content_response = await fetchPatchContent(patch_uuid);
        
        if (content_response.status !== 200) {
            console.error("Error fetching patch data");
            return;
        }

        setContent(content_response.data);

    };

    useEffect(() => {
        fetchUser();
        
        // If uuid is present, fetch patch data
        if (uuid) {
            // Fetch patch details
            fetchPatchData(uuid);
        };

    }, [uuid]);

    if (!user) {
        return (<Loading/>);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!uuid) { // Create new patch
            const formData = new FormData();
            formData.append('title', title);
            formData.append('thumbnail', thumbnail as Blob);
            formData.append('version', version);
            formData.append('description', description);
            formData.append('content', JSON.stringify(content));
            formData.append('created', new Date().toISOString());
            formData.append('updated', new Date().toISOString());
            formData.append('state', patchState);

            const response = await api.post("/patches/new/", 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 201) {
                setModalTitle("Patch sucesfully created");
                setModalContent("Your patch has been created successfully, you can now exit this page.");
                setModalOpen(true);
            }
            else {
                setModalTitle("Error creating patch");
                setModalContent("There was an error creating your patch, please try again.");
                setModalError(`(HTTP: ${response.status} | ${response.statusText})`);
                setModalOpen(true);
            };
        }
        else { // Update existing patch
            const formData = new FormData();
            formData.append('title', title);
            if (thumbnail) formData.append('thumbnail', thumbnail as Blob);
            formData.append('version', version);
            formData.append('description', description);
            formData.append('content', JSON.stringify(content));

            const response = await api.patch(`/patches/${uuid}/update/`, 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                setModalTitle("Patch sucesfully updated");
                setModalContent("Your patch has been updated successfully, you can now exit this page.");
                setModalOpen(true);
            }
            else {
                setModalTitle("Error updating patch");
                setModalContent("There was an error creating your patch, please try again.");
                setModalError(`(HTTP: ${response.status} | ${response.statusText})`);
                setModalOpen(true);
            };
        };
    };

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    return (
        <main>
            <CustomModal title={modalTitle} show={modalOpen} onClose={() => setModalOpen(!modalOpen)}>
                <p className="text-text">{modalContent}</p>
                {modalError && <p className="text-text text-clr_error">{modalError}</p>}
            </CustomModal>
            <form className="flex flex-col gap-y-8 px-8 md:px-[11.25%]" onSubmit={handleSubmit}>
                <div id="TitleBar" className="flex flex-row gap-x-8">
                    <div className="flex flex-col gap-y-2 items-center">
                        {!thumbnailPreview && <Placeholder className="w-32 h-32"/>}
                        {thumbnailPreview && <img src={thumbnailPreview} alt="User avatar" className="w-32 h-32"/>}
                        
                        <div className="flex flex-col gap-y-1">
                        <label htmlFor="thumbnail" className="text-clr_primary text-textbase">Thumbnail</label>
                        <input type="file" id="thumbnail" className="max-w-56 bg-background2 border-2 border-dashed border-text hover:border-clr_primary rounded-lg p-2 text-text file:mr-1 file:border-0 file:bg-transparent file:text-text file:opactity-70"  onChange={handleThumbnailChange}/>
                        </div>
                    </div>
                    <div id="PatchInfo" className="flex flex-col gap-y-3">
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                            <input className="semiboldheader3 md:semiboldheader2 text-clr_primary bg-background border-2 border-dashed border-text rounded-lg p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input className="semiboldheader3 md:semiboldheader2 text-text opacity-70 bg-background max-w-24 border-2 border-dashed border-text rounded-lg p-2" value={version} onChange={(e) => setVersion(e.target.value)}/>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col md:flex-row text-text gap-x-3 gap-y-3">
                                <div className="flex flex-row gap-x-1 items-center justify-center">
                                    <PersonFill className="w-4 h-4"/>
                                    <Link to={`/profile/${user.id}`}><p className="text-text cursor-pointer hover:opacity-70">{user.username}</p></Link>
                                </div>
                                <div className="flex flex-row gap-x-1 items-center justify-center">
                                    <Callendar className="w-4 h-4"/>
                                    <p>{format(created, 'dd-MM-yyyy')}</p>
                                </div>
                                {/* TODO: Add download stat */}
                            </div>
                            <select defaultValue={patchState} className="flex h-10 bg-background text-text p-2 rounded-lg border-2 border-clr_primary" onChange={(e) => setState(e.target.value as PatchStatesType)}>
                                        {PatchStates.map((state, index) => 
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                        )}
                            </select>
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