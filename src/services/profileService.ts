import api from '../utils/api';

const getProfile = async (id?: number | string) => {
    const url = id ? `/profile/${id}` : '/profile/me';
    const respone = await api.get(url);

    return respone.data;
};

const updateProfile = async (id: number | string, data: FormData) => {
    const response = await api.patch(`/profile/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const getCurrentUser = async () => {
    const response = await api.get(`/user/`);

    return response.data;

}

export {
    getProfile,
    updateProfile,
    getCurrentUser,
};