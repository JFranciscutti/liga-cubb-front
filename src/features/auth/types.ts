// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Role = 'super_admin' | 'admin';

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  username?: string;
  password?: string;
};

export type LoggedUser = {
  username: string;
};

// ----------------------------------------------------------------------

export type BasicContextType = {
  method: 'basic';
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (x: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  username?: string;
};
