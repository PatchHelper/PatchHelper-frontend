import api from '../utils/api';

const fetchPatches = async (page: number, sort?: string) => {
    // TODO: Implement sorting
    const url = `/patches/?page=${page}`;
    const response = await api.get(url);

    return response;
};

const fetchPatch = async (title: string) => {
    const url = `/patches/${title}`;
    const response = await api.get(url);

    return response;
};

const fetchPatchContent = async (title: string) => {
    const url = `/patches/${title}/content`;
    const response = await api.get(url);

    return response;
}

export {
    fetchPatches,
    fetchPatch,
    fetchPatchContent,
};