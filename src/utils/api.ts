import axios from 'axios';

import { isTokenExpired } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    validateStatus: (status) => {
        return true;
    }
});

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !isTokenExpired(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken && !isTokenExpired(refreshToken)) {
                try {
                    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('access_token', response.data.access);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (err) {
                    console.error('Token refresh failed:', err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;