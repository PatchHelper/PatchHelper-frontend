import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { getProfile } from "../services/profileService";
import { Callendar } from "../img";

type profile = {
    id: number;
    username: string;
    avatar: string;
    bio: string;
    joined: string;
};

const ProfileView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<profile | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bio, setBio] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile(id);
            setProfile(response);
            setAvatarPreview(response.avatar);
            setBio(response.bio);
        };
        fetchProfile();
    }, [id]);
    
    return (
        <main>
            {profile && (
            <div className="flex flex-col gap-y-8 mx-8 md:mx-[11.25%] p-4 rounded-2xl bg-background2">
                <h2 className="semiboldheader3 md:semiboldheader2 text-clr_primary">{profile.username}'s Profile</h2>
                <div className="flex flex-col gap-x-8 gap-y-6">
                    <div className="flex flex-col md:flex-row gap-y-4">
                        <div className="flex flex-col gap-y-2 items-center text-base text-text">
                            {avatarPreview && <img src={avatarPreview} alt="User avatar" className="w-32 h-32"/>}
                            <div className="flex flex-row gap-x-2">
                                <img src={Callendar} alt="Callendar icon" />
                                <p className="text-base text-text opacity-70">{format(new Date(profile.joined).toLocaleDateString(), 'dd-MM-yyyy')}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-3 w-full md:mx-4">
                            <p className="text-base text-text">{bio}</p>
                            
                            <div className="flex flex-col gap-y-2">
                                <h3 className="semiboldheader4 lg:semiboldheader3 text-clr_primary">Links</h3>
                                <div className="flex flex-wrap gap-x-2">
                                    {/* TODO: icons for each link*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </main>
    );
};

export default ProfileView;