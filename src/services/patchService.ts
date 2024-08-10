import api from '../utils/api';
import axios from 'axios';

const fetchPatches = async (page: number, sort?: string) => {
    if (!sort) {
        sort = "created";
    }

    const url = `/patches/?page=${page}&ordering=${sort}`;
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
    fetchPatch,
    fetchPatchContent,
    handleUpvote
};