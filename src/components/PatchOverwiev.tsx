import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { format, set } from 'date-fns';

import api from "../utils/api";
import { Button, CustomModal } from "../components";
import { PersonFill, Callendar, Upvote, Trash, Edit } from "../img";
import { Patch } from "../types";
import { PatchStates } from "../constants";
import { deletePatch } from "../services/patchService";

interface PatchOverviewProps {
    patch: Patch;
    editable?: boolean;
}

const PatchOverview: React.FC<PatchOverviewProps> = (props: PatchOverviewProps) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(true);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);

    const handleDelete = async () => {
        const response = await deletePatch(props.patch.uuid);
        if (response.status === 204) {
            setIsVisible(false);
        }
        else {
            console.error("Failed to delete patch");
        }
    };
    const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const state = e.target.value;
        const formData = new FormData();
        formData.append("state", state);

        const response = await api.patch(`/patches/${props.patch.uuid}/update/`, 
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }

    if (!isVisible) return null;

    return (
        <div className="flex flex-row gap-x-4 w-full p-6 bg-background2 items-center">
            <CustomModal show={deleteModalVisible} onClose={() => setDeleteModalVisible(!deleteModalVisible)} title="Delete post">
                <p className="basetext text-text">Are you sure you want to delete this post?</p>
                <div className="flex flex-row gap-x-4 mt-4">
                    <Button text="Cancel" variant="accent" fill="outline" onClick={() => setDeleteModalVisible(!deleteModalVisible)}/>
                    <Button text="Delete" variant="danger" fill="solid" onClick={handleDelete}><Trash className="w-4 h-4"/></Button>
                </div>
            </CustomModal>
            <div className="hidden md:flex flex-col w-16 h-16 md:w-32 md:h-32 shrink-0">
                {props.patch.thumbnail && <img src={props.patch.thumbnail} alt="Patch thumbnail" className="object-cover"/>}
            </div>
            <div className="flex flex-col sm:flex-row align-middle gap-y-5 justify-between w-full min-w-0">
                <div className="flex flex-col gap-y-2 min-w-0 max-w-full sm:max-w-[50%]">
                    <Link to={`/patches/${props.patch.uuid}`}className={`semiboldheader2 text-text truncate`}>{props.patch.title}</Link>
                    <div className="flex flex-col lg:flex-row gap-x-4 text-clr_primary md:text-base text-xs items-start gap-y-1">
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
                    <p className="basetext text-text text-wrap truncate line-clamp-2 md:line-clamp-3 max-w-[50%] md:max-w-max w-full">{props.patch.description}</p>
                </div>
                <div className="flex flex-col gap-y-3 gap-x-3 max-w-full min-w-0 sm:max-w-[50%]">
                    <div className={`flex flex-row ${props.editable? "visible" : "hidden"} gap-x-2`}>
                        {/* TODO: Add functionality */}
                        { props.editable && <Button text="Edit" variant="accent" fill="outline" className="max-h-10 max-w-15" link={`/patches/${props.patch.uuid}/edit`}><Edit className="w-4 h-4"/></Button> }
                        { props.editable && <Button text="Delete" variant="danger" fill="solid" className="max-h-10 max-w-15" onClick={() => setDeleteModalVisible(!deleteModalVisible)}><Trash className="w-4 h-4"/></Button>  }
                    </div>
                    {props.editable && 
                        <div className="flex flex-row gap-x-2 items-center">
                            <label className="text-text">State:</label>
                            <select defaultValue={props.patch.state} className="flex h-10 bg-background text-text p-2 rounded-lg border-2 border-clr_primary" onChange={(e) => handleStateChange(e)}>
                                {PatchStates.map((state, index) => 
                                <option key={index} value={state}>
                                    {state}
                                </option>
                                )}
                            </select>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PatchOverview;