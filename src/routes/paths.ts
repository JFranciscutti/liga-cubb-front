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
    categorias: {
      root: '/dashboard/categorias',
      list: '/dashboard/categorias/list',
      create: '/dashboard/categorias/create',
      edit: (id: number | string) => `/dashboard/categorias/edit/${id}`,
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
      PATHS.dashboard.categorias.root,
      PATHS.dashboard.categorias.list,
      PATHS.dashboard.categorias.create,
      PATHS.dashboard.categorias.edit(':id'),
      PATHS.dashboard.equipos.root,
      PATHS.dashboard.equipos.list,
      PATHS.dashboard.equipos.create,
      PATHS.dashboard.equipos.edit(':id'),
      PATHS.dashboard.fixtures.root,
      PATHS.dashboard.fixtures.list,
      PATHS.dashboard.fixtures.create,
      PATHS.dashboard.fixtures.edit(':id'),
    ],
  },
];
