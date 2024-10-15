import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_AFTER_LOGIN } from 'src/config';
// components
import { useAuth } from './BasicContext';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_AFTER_LOGIN} />;
  }

  return <>{children}</>;
}
