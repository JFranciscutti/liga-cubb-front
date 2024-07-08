import { createHashRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
// auth
import AuthGuard from '../features/auth/AuthGuard';
import GuestGuard from '../features/auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';

import App from 'src/App';

import { ElementType, lazy, Suspense } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import { LoadingSpinner } from 'src/components/loading-spinner';
import RoleBasedGuard from 'src/features/auth/RoleBasedGuard';
import ErrorPage from 'src/pages/ErrorPage';
import NotAllowedPage from 'src/pages/NotAllowedPage';
import ManageEquiposCategoriaPage from 'src/features/categoria/ManageEquiposCategoriaPage';
import EquiposListPage from 'src/features/equipo/EquipoListPage';
import EquipoEditPage from 'src/features/equipo/EquipoEditPage';
import CategoriaPlayoffPage from 'src/features/playoffs/CategoryPlayoffPage';

/**
 * This will show a full screen spinner while the component is loading.
 * It is meant to we used for pages
 */
const withLoadingScreen = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

/**
 * This will show a spinner while the component is loading
 * It is meant to we used for components where you do not want to block the whole page
 */
const withLoadingSpinner = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );

const LazyPage404 = withLoadingScreen(lazy(() => import('../pages/Page404')));
const LazyLoginPage = withLoadingScreen(lazy(() => import('src/features/auth/login/LoginPage')));
const LazyRegisterPage = withLoadingScreen(
  lazy(() => import('src/features/auth/register/RegisterPage'))
);
const LazyResetPasswordPage = withLoadingScreen(
  lazy(() => import('src/features/auth/reset-password/ResetPasswordPage'))
);
const LazyNewPasswordPage = withLoadingScreen(
  lazy(() => import('src/features/auth/new-password/NewPasswordPage'))
);
const LazyVerifyCodePage = withLoadingScreen(
  lazy(() => import('src/features/auth/verify-code/VerifyCodePage'))
);
const LazyAdminUsersListPage = withLoadingSpinner(
  lazy(() => import('src/features/admin-user-crud/AdminUserListPage'))
);
const LazyAdminUsersCreatePage = withLoadingSpinner(
  lazy(() => import('src/features/admin-user-crud/AdminUserCreatePage'))
);
const LazyAdminUsersEditPage = withLoadingSpinner(
  lazy(() => import('src/features/admin-user-crud/AdminUserEditPage'))
);
const LazyCategoriaListPage = withLoadingSpinner(
  lazy(() => import('src/features/categoria/CategoriaListPage'))
);

const LazyCategoriaEditPage = withLoadingSpinner(
  lazy(() => import('src/features/categoria/CategoriaEditPage'))
);

const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      {
        path: 'auth',
        element: (
          <GuestGuard>
            <Outlet />
          </GuestGuard>
        ),
        children: [
          {
            path: 'login',
            element: <LazyLoginPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'register',
            element: <LazyRegisterPage />,
          },
          {
            element: <CompactLayout />,
            children: [
              { path: 'reset-password', element: <LazyResetPasswordPage /> },
              { path: 'new-password', element: <LazyNewPasswordPage /> },
              { path: 'verify', element: <LazyVerifyCodePage /> },
            ],
          },
          { element: <Navigate to="login" replace />, index: true },
        ],
      },

      {
        path: 'dashboard',
        errorElement: <ErrorPage />,
        element: (
          <AuthGuard>
            <RoleBasedGuard>
              <DashboardLayout />
            </RoleBasedGuard>
          </AuthGuard>
        ),
        children: [
          { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
          {
            path: 'usuarios',
            children: [
              { element: <Navigate to="/dashboard/usuarios/list" replace />, index: true },
              { path: 'list', element: <LazyAdminUsersListPage /> },
              { path: 'create', element: <LazyAdminUsersCreatePage /> },
              { path: 'edit/:id', element: <LazyAdminUsersEditPage /> },
            ],
          },
          {
            path: 'categorias',
            children: [
              { element: <Navigate to="/dashboard/categorias/list" replace />, index: true },
              { path: 'list', element: <LazyCategoriaListPage /> },
              { path: 'edit/:id/playoff', element: <CategoriaPlayoffPage /> },
              { path: 'edit/:id/equipos', element: <ManageEquiposCategoriaPage /> },
              {
                path: 'edit/:id',
                element: <LazyCategoriaEditPage />,
              },
            ],
          },
          {
            path: 'equipos',
            children: [
              { element: <Navigate to="/dashboard/equipos/list" replace />, index: true },
              { path: 'list', element: <EquiposListPage /> },

              { path: 'edit/:id', element: <EquipoEditPage /> },
            ],
          },
        ],
      },
      {
        element: <CompactLayout />,
        children: [
          { path: '404', element: <LazyPage404 /> },
          { path: 'not-allowed', element: <NotAllowedPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];

export const router = createHashRouter(ROUTES);
