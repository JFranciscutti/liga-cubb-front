import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
// utils
import { AuthRepository, useLoginMutation } from 'src/api/AuthRepository';
import { AuthStateType, JWTContextType, Role } from './types';
import { setSession } from './utils';

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  userId: undefined,
  user: {
    displayName: '',
    email: '',
  },
};

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

const userRepo = new AuthRepository();

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState(initialState);
  const loginMutation = useLoginMutation();
  const tokenExpirationTimeoutRef = useRef<NodeJS.Timeout>();

  const setStateFromToken = async (accessToken: string) => {
    const decodedUser = jwtDecode<{ user_id: number; roles: Role[] }>(accessToken);
    const { data: user } = await userRepo.getLoggedUser();
    let loggedUser = {
      displayName: user.email,
      role: 'Estudiante',
      photoURL: '',
      email: user.email,
    };

    setState((x) => ({
      ...x,
      isAuthenticated: true,
      userId: decodedUser.user_id,
      roles: decodedUser.roles,
      isInitialized: true,
      user: loggedUser,
    }));
  };

  const initializeState = () =>
    setState((x) => ({
      ...x,
      isAuthenticated: true,
      userId: 1,
      roles: ['super_admin'],
      isInitialized: true,
    }));

  const logout = useCallback(async () => {
    setSession(null);
    initializeState();
  }, []);

  const setTokenExpirationCallback = useCallback(
    (accessToken: string) => {
      const { exp } = jwtDecode<{ exp: string }>(accessToken);
      const expirationDate = moment.unix(Number(exp));
      const expiration = expirationDate.diff(moment(), 'milliseconds');
      if (expiration < 0) {
        logout();
      }
      tokenExpirationTimeoutRef.current = setTimeout(() => {
        logout();
      }, expiration);
    },
    [logout]
  );

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      setSession(accessToken);
      if (accessToken) {
        setTokenExpirationCallback(accessToken);
        setStateFromToken(accessToken);
      } else {
        initializeState();
      }
    } catch (error) {
      console.error(error);
      initializeState();
    }
    return () =>
      tokenExpirationTimeoutRef.current && clearTimeout(tokenExpirationTimeoutRef.current);
  }, [setTokenExpirationCallback]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async ({ email, password }: { email: string; password: string }) => {
    const {
      data: { token },
    } = await loginMutation.mutateAsync({ email, password });
    setSession(token);
    setStateFromToken(token);
  };

  const isSuperAdmin = () => (state.roles ?? []).includes('super_admin');

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
