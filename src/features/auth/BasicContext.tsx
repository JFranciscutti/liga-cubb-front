import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLoginMutation } from 'src/api/AuthRepository';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { useEffect } from 'react';

interface AuthContextType {
  username: string | undefined;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = getCookie('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Estado inicial basado en el token
  const loginMutation = useLoginMutation();

  const login = async (username: string, password: string) => {
    const response = await loginMutation.mutateAsync({ username, password });
    const token = response.data;

    if (token) {
      setCookie('token', token);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeCookie('token');
  };

  const username = token ? atob(token)?.split(':')[0] : undefined;

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
