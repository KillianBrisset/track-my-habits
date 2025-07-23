import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth0 } from '../hooks/useAuth0';
import { storage } from '../utils/storage';

type AuthContextType = {
  accessToken: string | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {  promptAsync, response } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le token au démarrage
  useEffect(() => {
    storage.getItem('accessToken').then(token => {
      setAccessToken(token);
      setIsLoading(false);
    });
  }, []);

  // Stocker le token Auth0 après login
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token, scope, expires_in, token_type, state } = response.params;
      setAccessToken(access_token);
      storage.setItem('accessToken', access_token);
      storage.setItem('scope', scope);
        storage.setItem('expires_in', expires_in);
        storage.setItem('token_type', token_type);
        storage.setItem('state', state);
    }
  }, [response]);

  const login = () => promptAsync();
  const logout = () => {
    setAccessToken(null);
    storage.deleteItem('accessToken');
    storage.deleteItem('scope');
    storage.deleteItem('expires_in');
    storage.deleteItem('token_type');
    storage.deleteItem('state');
    // Bonus : faire appel à l’endpoint de déconnexion Auth0 ici si besoin
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
