import api from '../utils/api';

const fetchPatches = async () => {
    const response = await api.get('/patches/');

    console.log(response.data);

    return response;
};

const fetchPatch = async (title: string) => {
    const url = `/patches/${title}`;
    const response = await api.get(url);

    console.log(response.data);

    return response;
};

export {
    fetchPatches,
    fetchPatch,
};