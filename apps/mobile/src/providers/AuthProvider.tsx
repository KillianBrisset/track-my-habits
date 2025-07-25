import { UserEntity, UserInfo } from '@track-my-habits/data';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { getUserInfo, useAuth0 } from '../hooks/useAuth0';
import { getUser } from '../services/api';
import { storage } from '../utils/storage';

type AuthContextType = {
    accessToken: string | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
    userInfo: UserInfo | null; // Optional, can be extended to include user profile data
    user: UserEntity | null;
};


const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    userInfo: null,
    login: () => {},
    logout: () => {},
    isLoading: true,
    user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {  promptAsync, response } = useAuth0();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [user, setUser] = useState<UserEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load the access token from storage on mount
    useEffect(() => {
        storage.getItem('accessToken').then(async (token) => {
            // verify if the token is valid
            
            if (token ) {
                const userInfo = await getUserInfo(token);
                if (userInfo) {
                    setUserInfo(userInfo);
                    setAccessToken(token);
                    const user = await getUser(token);
                    setUser(user);
                } else {
                    logout();
                }
            } else {
                logout();
            }

            setIsLoading(false);
        });
    }, []);

    // Store the Auth0 token after login
    useEffect(() => {
        if (response?.type === 'success') {
            const { access_token, scope, expires_in, token_type, state } = response.params;
            setAccessToken(access_token);
            getUserInfo(access_token).then((user) => {
                setUserInfo(user);
            });
               getUser(access_token).then((user) => {
                setUser(user);
            });
            storage.setItem('accessToken', access_token);
            storage.setItem('scope', scope);
            storage.setItem('expires_in', expires_in);
            storage.setItem('token_type', token_type);
            storage.setItem('state', state);
        } else if (response?.type === 'error') {
            logout();
        }
    }, [response]);



    const login = () => promptAsync();
    const logout = () => {
        setAccessToken(null);
        setUserInfo(null);
        storage.deleteItem('accessToken');
        storage.deleteItem('scope');
        storage.deleteItem('expires_in');
        storage.deleteItem('token_type');
        storage.deleteItem('state');
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, isLoading, userInfo, user }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
