import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import authService, { UserData } from '../services/AuthService';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: UserData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}>(null!);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null)  ;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const userData = await authService.login(username, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const userData = await authService.refreshToken();
      setUser(userData);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      console.error('Erreur lors du rafraîchissement du jeton :', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};