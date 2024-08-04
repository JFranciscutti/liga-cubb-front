/**
 * Every path that is used in the application must be added here. This way, if a path changes, it will be changed in one place only.
 */
export const PATHS = {
  path: '',
  auth: {
    root: '/auth',
    login: '/auth/login',
    resetPassword: '/auth/reset-password',
    newPassword: '/auth/new-password',
    verify: '/auth/verify',
    register: '/auth/register',
  },
  dashboard: {
    root: '/dashboard',
    usuarios: {
      root: '/dashboard/usuarios',
      list: '/dashboard/usuarios/list',
      create: '/dashboard/usuarios/create',
      edit: (id: number | string) => `/dashboard/usuarios/edit/${id}`,
    },
    categorias: {
      root: '/dashboard/categorias',
      list: '/dashboard/categorias/list',
      create: '/dashboard/categorias/create',
      edit: (id: number | string) => `/dashboard/categorias/edit/${id}`,
      manageEquipos: (id: number | string) => `/dashboard/categorias/edit/${id}/equipos`,
      playoff: (id: number | string) => `/dashboard/categorias/edit/${id}/playoff`,
      fixture: (id: number | string) => `/dashboard/categorias/edit/${id}/fixture`,
    },
    equipos: {
      root: '/dashboard/equipos',
      list: '/dashboard/equipos/list',
      create: '/dashboard/equipos/create',
      edit: (id: number | string) => `/dashboard/equipos/edit/${id}`,
    },
    fixtures: {
      root: '/dashboard/fixtures',
      list: '/dashboard/fixtures/list',
      create: '/dashboard/fixtures/create',
      edit: (id: number | string) => `/dashboard/fixtures/edit/${id}`,
    },
    jugadores: {
      root: '/dashboard/jugadores',
      list: '/dashboard/jugadores/list',
    },
    campeonatos: {
      root: '/dashboard/campeonatos',
      list: '/dashboard/campeonatos/list',
      create: '/dashboard/campeonatos/create',
      manage: (id: number | string) => `/dashboard/campeonatos/manage/${id}`,
      manageEquiposCopa: (id: number | string) =>
        `/dashboard/campeonatos/manage/${id}/equipos-copa`,
      manageGroupsCopa: (id: number | string) => `/dashboard/campeonatos/manage/${id}/grupos-copa`,
      manageFixtureGroupsCopa: (id: number | string) =>
        `/dashboard/campeonatos/manage/${id}/fixture-grupos-copa`,
    },
  },
} as const;

/**
 * Every path that a role can access must be added here. Otherwise, the user will be redirected to the Not allowed page.
 */
export const PATHS_PER_ROLE = [
  {
    role: 'super_admin',
    paths: [
      PATHS.dashboard.root,
      PATHS.dashboard.campeonatos.root,
      PATHS.dashboard.campeonatos.list,
      PATHS.dashboard.campeonatos.create,
      PATHS.dashboard.campeonatos.manage(':id'),
      PATHS.dashboard.campeonatos.manageEquiposCopa(':id'),
      PATHS.dashboard.campeonatos.manageGroupsCopa(':id'),
      PATHS.dashboard.campeonatos.manageFixtureGroupsCopa(':id'),
      PATHS.dashboard.categorias.root,
      PATHS.dashboard.categorias.list,
      PATHS.dashboard.categorias.create,
      PATHS.dashboard.categorias.edit(':id'),
      PATHS.dashboard.categorias.manageEquipos(':id'),
      PATHS.dashboard.categorias.playoff(':id'),
      PATHS.dashboard.categorias.fixture(':id'),
      PATHS.dashboard.equipos.root,
      PATHS.dashboard.equipos.list,
      PATHS.dashboard.equipos.create,
      PATHS.dashboard.equipos.edit(':id'),
      PATHS.dashboard.jugadores.root,
      PATHS.dashboard.jugadores.list,
    ],
  },
];
