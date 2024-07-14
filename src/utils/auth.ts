import { jwtDecode } from "jwt-decode";
import api from "./api";

export interface jwtPayload {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    if (!token) {
        return true;
    }
    const { exp } = jwtDecode<jwtPayload>(token);
    if (exp * 1000 < Date.now()) {
        return true;
    }
    return false;
};

export const isLoggedIn = (): boolean => {
    const token = localStorage.getItem("access_token");
    return token !== null && !isTokenExpired(token);
};

export const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        try {
            await api.post('logout/', { refresh: refreshToken });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};