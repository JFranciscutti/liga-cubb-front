import { createContext, useCallback, useEffect, useRef, useState } from 'react';
// utils
import { AuthRepository, useLoginMutation } from 'src/api/AuthRepository';
import { AuthStateType, BasicContextType } from './types';
import { setSession } from './utils';

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  username: undefined,
  password: undefined,
};

export const AuthContext = createContext<BasicContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

const userRepo = new AuthRepository();

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState(initialState);
  const loginMutation = useLoginMutation();
  const tokenExpirationTimeoutRef = useRef<NodeJS.Timeout>();

  const setStateFromToken = async () => {
    const { data: user } = await userRepo.getLoggedUser();
    let loggedUser = {
      displayName: user.email,
      photoURL: '',
      email: user.email,
    };

    setState((x) => ({
      ...x,
      isAuthenticated: true,
      userId: user.id,
      isInitialized: true,
      user: loggedUser,
    }));
  };

  const initializeState = () =>
    setState((x) => ({
      ...x,
      isAuthenticated: true,
      userId: 1,
      isInitialized: true,
    }));

  const logout = useCallback(async () => {
    setSession(null);
    initializeState();
  }, []);

  const initialize = useCallback(async () => {
    try {
      const username = typeof window !== 'undefined' ? localStorage.getItem('username') : '';
      if (username) {
        setStateFromToken();
      } else {
        initializeState();
      }
    } catch (error) {
      console.error(error);
      initializeState();
    }
    return () =>
      tokenExpirationTimeoutRef.current && clearTimeout(tokenExpirationTimeoutRef.current);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await loginMutation.mutateAsync({ email, password });
    const { token } = data;
    localStorage.setItem('token', token);
    setStateFromToken();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'basic',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
