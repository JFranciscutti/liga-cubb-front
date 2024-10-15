// @mui
// components
// assets
//
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './BasicContext';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  children: React.ReactNode;
};

export default function RoleBasedGuard({ children }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/not-allowed" />;
  }

  return <>{children}</>;
}
