import axios from "axios";

const API_URL = "http://127.0.0.0:8000/api/posts";

interface Post {
    id: number;
    title: string;
    description: string;
};

export const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post: Post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};