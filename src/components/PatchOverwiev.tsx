import React from "react";
import { Link } from "react-router-dom";
import { format, set } from 'date-fns';

import { Button, CustomModal } from "../components";
import { PersonFill, Callendar, Upvote, Trash, Edit } from "../img";
import { Patch } from "../types";
import { deletePatch } from "../services/patchService";

interface PatchOverviewProps {
    patch: Patch;
    editable?: boolean;
}

const PatchOverview: React.FC<PatchOverviewProps> = (props: PatchOverviewProps) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

    const handleDelete = async () => {
        const response = await deletePatch(props.patch.uuid);
        if (response.status === 204) {
            setIsVisible(false);
        }
        else {
            console.error("Failed to delete patch");
        }
    }

    if (!isVisible) return null;

    return (
        <div className="flex flex-row gap-x-4 p-6 bg-background2 items-center">
            <CustomModal show={deleteModalVisible} onClose={() => setDeleteModalVisible(!deleteModalVisible)} title="Delete post">
                <p className="basetext text-text">Are you sure you want to delete this post?</p>
                <div className="flex flex-row gap-x-4 mt-4">
                    <Button text="Cancel" variant="accent" fill="outline" onClick={() => setDeleteModalVisible(!deleteModalVisible)}/>
                    <Button text="Delete" variant="danger" fill="solid" onClick={handleDelete}><Trash className="w-4 h-4"/></Button>
                </div>
            </CustomModal>
            {props.patch.thumbnail && <img src={props.patch.thumbnail} alt="Patch thumbnail" className="w-16 h-16 md:w-32 md:h-32"/>}
            <div className="flex flex-col gap-y-3 w-full">
                <div className="flex flex-col align-middle gap-y-2">
                    <div className="flex flex-row justify-between">
                        <Link to={`/patches/${props.patch.uuid}`}className={`semiboldheader2 text-text truncate ${props.editable? `max-w-[45%]` : `max-w-[100%]`}`}>{props.patch.title}</Link>
                        <div className={`flex flex-row ${props.editable? "visible" : "hidden"} gap-x-2`}>
                            {/* TODO: Add functionality */}
                            { props.editable && <Button text="Edit" variant="accent" fill="outline" className="max-h-10 max-w-15" link={`/patches/${props.patch.uuid}/edit`}><Edit className="w-4 h-4"/></Button> }
                            { props.editable && <Button text="Delete" variant="danger" fill="solid" className="max-h-10 max-w-15" onClick={() => setDeleteModalVisible(!deleteModalVisible)}><Trash className="w-4 h-4"/></Button>  }
                        </div>
                    </div>
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
                </div>
                <p className="basetext text-text">{props.patch.description}</p>
            </div>
        </div>
    );
};

export default PatchOverview;