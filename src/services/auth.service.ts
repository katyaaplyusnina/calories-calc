import {IAuthData, IAuthResponse} from '../types/user';
import httpClient from "./http-client";

export const login = async (data: IAuthData): Promise<IAuthResponse> => {
    const response = await httpClient.post('/auth/login', data);

    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem('authToken');
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');

    return token !== null;
};