import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import { getProfile, updateProfile } from "../services/profileService";
import { Button } from "../components";
import { Callendar } from "../img";

type profile = {
    id: number;
    username: string;
    avatar: string;
    bio: string;
    joined: string;
};

const ProfileEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<profile | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bio, setBio] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile(id);
            setProfile(response);
            console.log(response);
            setAvatar(response.avatar);
            setAvatarPreview(response.avatar);
            setBio(response.bio);
        };
        fetchProfile();
    }, [id]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!profile) return;
        
        const formData = new FormData();
        formData.append('bio', bio);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        const updatedProfile = await updateProfile(profile.id, formData);
        setProfile(updatedProfile);
    };

    return (
    <main>
        {profile && (
            <div className="flex flex-col gap-y-8 mx-8 md:mx-[11.25%] p-4 rounded-2xl bg-background2">
                <h2 className="semiboldheader3 md:semiboldheader2 text-clr_primary">{profile.username}'s Profile</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-x-8 gap-y-6">
                    <div className="flex flex-col md:flex-row gap-y-4">
                        <div className="flex flex-col gap-y-2 items-center text-base text-text">
                            {avatarPreview && <img src={avatarPreview} alt="User avatar" className="w-32 h-32"/>}
                            <div className="flex flex-row gap-x-2">
                                <Callendar className="w-4 h-4"/>
                                <p className="text-base text-text opacity-70">{format(new Date(profile.joined).toLocaleDateString(), 'dd-MM-yyyy')}</p>
                            </div>
                            <input type="file" accept="image/*" id="avatar" onChange={handleAvatarChange} />
                        </div>

                        <div className="flex flex-col gap-y-3 w-full md:mx-4">
                            <input 
                            type="text" 
                            id="bio" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 rounded-lg text-text bg-background2 border-2 border-dashed border-text focus:border-clr_primary focus:outline-none" 
                            />
                            
                            <div className="flex flex-col gap-y-2">
                                <h3 className="semiboldheader4 lg:semiboldheader3 text-clr_primary">Links</h3>
                                <div className="flex flex-wrap gap-x-2">
                                    {/* TODO: icons for each link*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" text="Update Profile" className="max-w-36"/>
                </form>
            </div>
        )}
    </main>
    );
};

export default ProfileEdit;