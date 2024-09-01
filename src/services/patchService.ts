import api from '../utils/api';

const fetchPatches = async (page: number, sort?: string) => {
    // if no sort is provided, default to sorting by creation date
    if (!sort) {
        sort = "-created";
    }

    const url = `/patches/?page=${page}&ordering=${sort}`;
    const response = await api.get(url);

    return response;
};

const fetchUserPatches = async (page: number, user_id?: number, sort?: string) => {
    // if no sort is provided, default to sorting by creation date
    if (!sort) {
        sort = "-created";
    }

    const url_query = user_id ? `&user_id=${user_id}` : "";
    const url = `/patches/user/?page=${page}&ordering=${sort}` + url_query;
    const response = await api.get(url);

    return response;
};

const fetchPatch = async (uuid: string) => {
    const url = `/patches/${uuid}`;
    const response = await api.get(url);

    return response;
};

const fetchPatchContent = async (uuid: string) => {
    const url = `/patches/${uuid}/content`;
    const response = await api.get(url);

    return response;
}

const handleUpvote = async (uuid: string) => {
    const response = await api.post(`/patches/${uuid}/upvote/`);
    return response;
}

export {
    fetchPatches,
    fetchUserPatches,
    fetchPatch,
    fetchPatchContent,
    handleUpvote
};