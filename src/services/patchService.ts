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

const handleUpvote = async (id: number) => {
    const response = await api.post(`/patches/${id}/upvote/`);
    return response;
}

export {
    fetchPatches,
    fetchUserPatches,
    fetchPatch,
    fetchPatchContent,
    handleUpvote
};