import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  Outlet,
  RouteObject,
} from 'react-router-dom';
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
import ErrorPage from 'src/pages/ErrorPage';
import NotAllowedPage from 'src/pages/NotAllowedPage';

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

const LazyCategoriaListPage = withLoadingSpinner(
  lazy(() => import('src/features/categoria/CategoriaListPage'))
);

const LazyCategoriaEditPage = withLoadingSpinner(
  lazy(() => import('src/features/categoria/CategoriaEditPage'))
);

const LazyManageEquiposCategoriaPage = withLoadingSpinner(
  lazy(() => import('src/features/categoria/ManageEquiposCategoriaPage'))
);

const LazyEquiposListPage = withLoadingSpinner(
  lazy(() => import('src/features/equipo/EquipoListPage'))
);

const LazyEquipoEditPage = withLoadingSpinner(
  lazy(() => import('src/features/equipo/EquipoEditPage'))
);

const LazyFixturePage = withLoadingSpinner(lazy(() => import('src/features/fixtures/FixturePage')));

const LazyEditFixturePage = withLoadingSpinner(
  lazy(() => import('src/features/fixtures/EditFixturePage'))
);

const LazyJugadoresListPage = withLoadingSpinner(
  lazy(() => import('src/features/jugadores/JugadoresListPage'))
);

const LazyManageCampeonatoPage = withLoadingSpinner(
  lazy(() => import('src/features/campeonatos/ManageCampeonatoPage'))
);

const LazyCampeonatosPage = withLoadingSpinner(
  lazy(() => import('src/features/campeonatos/CampeonatosPage'))
);

const LazyManageEquiposCopaPage = withLoadingSpinner(
  lazy(() => import('src/features/copa/ManageEquiposCopaPage'))
);

const LazyManageGruposCopaPage = withLoadingSpinner(
  lazy(() => import('src/features/copa/ManageGruposCopaPage'))
);

const LazyManageFixtureGruposCopaPage = withLoadingSpinner(
  lazy(() => import('src/features/copa/ManageFixtureGruposCopaPage'))
);

const LazyPlayoffPage = withLoadingSpinner(lazy(() => import('src/features/playoffs/PlayoffPage')));

const LazyEditPlayoffPage = withLoadingSpinner(
  lazy(() => import('src/features/playoffs/EditPlayoffPage'))
);

const LazyEquipoCopaEditPage = withLoadingSpinner(
  lazy(() => import('src/features/equipo/EquipoCopaEditPage'))
);

const LazyEditFaseGruposCopa = withLoadingSpinner(
  lazy(() => import('src/features/campeonatos/EditFaseGruposCopa'))
);

const LazyManagePlayoffCopaPage = withLoadingSpinner(
  lazy(() => import('src/features/playoffs/PlayoffCopaPage'))
);

const LazyEditPlayoffCopaPage = withLoadingSpinner(
  lazy(() => import('src/features/playoffs/EditPlayoffCopaPage'))
);

const LazyNovedadesListPage = withLoadingSpinner(
  lazy(() => import('src/features/novedades/NovedadesListPage'))
);

const LazyNovedadesEditPage = withLoadingSpinner(
  lazy(() => import('src/features/novedades/NovedadesEditPage'))
);

const LazyNovedadesCreatePage = withLoadingSpinner(
  lazy(() => import('src/features/novedades/NovedadesCreatePage'))
);

const LazyTestPage = withLoadingSpinner(lazy(() => import('src/pages/TestPage')));

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
        path: 'test',
        element: <LazyTestPage />,
      },
      {
        path: 'dashboard',
        errorElement: <ErrorPage />,
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
          {
            path: 'categorias',
            children: [
              { element: <Navigate to="/dashboard/categorias/list" replace />, index: true },
              { path: 'list', element: <LazyCategoriaListPage /> },
              // { path: 'edit/:id/create-fase-regular', element: <LazyFixturePage /> },
              // { path: 'edit/:id/create-fase-playoff', element: <LazyPlayoffPage /> },
              // { path: 'edit/:id/create-fase-grupos', element: <LazyManageGruposCopaPage /> },

              // { path: 'edit/:id/edit-fase-regular', element: <LazyEditFixturePage /> },
              // { path: 'edit/:id/edit-fase-playoff', element: <LazyEditPlayoffPage /> },
              { path: 'edit/:id/equipos', element: <LazyManageEquiposCategoriaPage /> },
              {
                path: 'edit/:id',
                element: <LazyCategoriaEditPage />,
              },
            ],
          },
          {
            path: 'campeonatos',
            children: [
              { element: <Navigate to="/dashboard/campeonatos/list" replace />, index: true },
              { path: 'list', element: <LazyCampeonatosPage /> },
              {
                path: 'manage/:idCampeonato/edit-fase-grupos/:idFase',
                element: <LazyEditFaseGruposCopa />,
              },
              {
                path: 'manage/:idCampeonato/edit-fase-playoff/:idFase',
                element: <LazyEditPlayoffCopaPage />,
              },
              {
                path: 'manage/:idCampeonato/equipos-copa/:idEquipo',
                element: <LazyEquipoCopaEditPage />,
              },
              { path: 'manage/:id/equipos-copa', element: <LazyManageEquiposCopaPage /> },

              { path: 'manage/:id/playoff-copa', element: <LazyManagePlayoffCopaPage /> },

              { path: 'manage/:idCampeonato/grupos-copa', element: <LazyManageGruposCopaPage /> },

              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/edit-fase-regular/:idFase',
                element: <LazyEditFixturePage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/edit-fase-playoff/:idFase',
                element: <LazyEditPlayoffPage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/create-fase-regular',
                element: <LazyFixturePage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/create-fase-playoff',
                element: <LazyPlayoffPage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/create-fase-grupos',
                element: <LazyManageGruposCopaPage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/equipos/:idEquipo',
                element: <LazyEquipoEditPage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria/equipos',
                element: <LazyEquiposListPage />,
              },
              {
                path: 'manage/:idCampeonato/categoria/:idCategoria',
                element: <LazyCategoriaEditPage />,
              },
              { path: 'manage/:id', element: <LazyManageCampeonatoPage /> },
            ],
          },
          // {
          //   path: 'equipos',
          //   children: [
          //     { element: <Navigate to="/dashboard/equipos/list" replace />, index: true },
          //     { path: 'list', element: <LazyEquiposListPage /> },

          //     { path: 'edit/:id', element: <LazyEquipoEditPage /> },
          //   ],
          // },
          {
            path: 'jugadores',
            children: [
              { element: <Navigate to="/dashboard/jugadores/list" replace />, index: true },
              { path: 'list', element: <LazyJugadoresListPage /> },
            ],
          },
          {
            path: 'novedades',
            children: [
              { element: <Navigate to="/dashboard/novedades/list" replace />, index: true },
              { path: 'list', element: <LazyNovedadesListPage /> },
              { path: 'create', element: <LazyNovedadesCreatePage /> },
              { path: 'edit/:id', element: <LazyNovedadesEditPage /> },
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

export const router = createBrowserRouter(ROUTES);
