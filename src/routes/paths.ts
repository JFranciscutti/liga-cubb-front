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
      createFaseRegular: (id: number | string) =>
        `/dashboard/categorias/edit/${id}/create-fase-regular`,
      createFasePlayoff: (id: number | string) =>
        `/dashboard/categorias/edit/${id}/create-fase-playoff`,
      createFaseGrupos: (id: number | string) =>
        `/dashboard/categorias/edit/${id}/create-fase-grupos`,
      editFaseRegular: (id: number | string) =>
        `/dashboard/categorias/edit/${id}/edit-fase-regular`,
      editFasePlayoff: (id: number | string) =>
        `/dashboard/categorias/edit/${id}/edit-fase-playoff`,
      editFaseGrupos: (id: number | string) => `/dashboard/categorias/edit/${id}/edit-fase-grupos`,
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
      manageCategoria: (idCampeonato: string, idCategoria: string) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}`,
      manageEquiposCategoria: (idCampeonato: string, idCategoria: string) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/equipos`,
      manageEquipoFromCategoria: (idCampeonato: string, idCategoria: string, idEquipo: string) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/equipos/${idEquipo}`,

      createFaseRegularCategoria: (idCampeonato: string, idCategoria: string,) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/create-fase-regular`,
      createFasePlayoffCategoria: (idCampeonato: string, idCategoria: string,) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/create-fase-playoff`,
      createFaseGruposCategoria: (idCampeonato: string, idCategoria: string,) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/create-fase-grupos`,

      editFaseRegularCategoria: (idCampeonato: string, idCategoria: string, idFase: string) => `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/edit-fase-regular/${idFase}`,
      editFasePlayoffCategoria: (idCampeonato: string, idCategoria: string, idFase: string) => `/dashboard/campeonatos/manage/${idCampeonato}/categoria/${idCategoria}/edit-fase-playoff/${idFase}`,
      manageEquiposCopa: (id: number | string) =>
        `/dashboard/campeonatos/manage/${id}/equipos-copa`,
      manageOneEquipoCopa: (id: string, idEquipo: string) =>
        `/dashboard/campeonatos/manage/${id}/equipos-copa/${idEquipo}`,
      createFaseGrupos: (idCampeonato: number | string) => `/dashboard/campeonatos/manage/${idCampeonato}/grupos-copa`,
      createPlayoff: (id: number | string) => `/dashboard/campeonatos/manage/${id}/playoff-copa`,
      manageFixtureGroupsCopa: (id: number | string) =>
        `/dashboard/campeonatos/manage/${id}/fixture-grupos-copa`,
      editFaseGrupos: (idCampeonato: string, idFase: string) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/edit-fase-grupos/${idFase}`,
      editFasePlayoff: (idCampeonato: string, idFase: string) =>
        `/dashboard/campeonatos/manage/${idCampeonato}/edit-fase-playoff/${idFase}`,
    },
    novedades: {
      root: '/dashboard/novedades',
      list: '/dashboard/novedades/list',
      create: '/dashboard/novedades/create',
      edit: (id: number | string) => `/dashboard/novedades/edit/${id}`,
    },
    carrusel: {
      root: '/dashboard/carrusel',
      list: '/dashboard/carrusel/list',
      create: '/dashboard/carrusel/create',
      edit: (id: number | string) => `/dashboard/carrusel/edit/${id}`,
    }
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
      PATHS.dashboard.campeonatos.createFaseGrupos(':idCampeonato'),
      PATHS.dashboard.campeonatos.manageFixtureGroupsCopa(':id'),
      PATHS.dashboard.categorias.root,
      PATHS.dashboard.categorias.list,
      PATHS.dashboard.categorias.create,
      PATHS.dashboard.categorias.edit(':id'),
      PATHS.dashboard.categorias.manageEquipos(':id'),
      PATHS.dashboard.categorias.playoff(':id'),
      PATHS.dashboard.categorias.createFaseRegular(':id'),
      PATHS.dashboard.categorias.createFasePlayoff(':id'),
      PATHS.dashboard.categorias.createFaseGrupos(':id'),
      PATHS.dashboard.categorias.editFaseRegular(':id'),
      PATHS.dashboard.categorias.editFasePlayoff(':id'),
      PATHS.dashboard.categorias.editFaseGrupos(':id'),
      PATHS.dashboard.equipos.root,
      PATHS.dashboard.equipos.list,
      PATHS.dashboard.equipos.create,
      PATHS.dashboard.equipos.edit(':id'),
      PATHS.dashboard.jugadores.root,
      PATHS.dashboard.jugadores.list,
      PATHS.dashboard.campeonatos.manageCategoria(':idCampeonato', ':idCategoria'),
      PATHS.dashboard.campeonatos.manageEquiposCategoria(':idCampeonato', ':idCategoria'),
      PATHS.dashboard.campeonatos.manageEquipoFromCategoria(
        ':idCampeonato',
        ':idCategoria',
        ':idEquipo'
      ),
      PATHS.dashboard.campeonatos.manageOneEquipoCopa(':idCampeonato', ':idEquipo'),
      PATHS.dashboard.campeonatos.editFaseGrupos(':idCampeonato', ':idFase'),
      PATHS.dashboard.campeonatos.editFasePlayoff(':idCampeonato', ':idFase'),
      PATHS.dashboard.campeonatos.createFaseGruposCategoria(':idCampeonato', ':idCategoria'),
      PATHS.dashboard.campeonatos.createFasePlayoffCategoria(':idCampeonato', ':idCategoria'),
      PATHS.dashboard.campeonatos.createFaseRegularCategoria(':idCampeonato', ':idCategoria'),
      PATHS.dashboard.campeonatos.editFaseRegularCategoria(':idCampeonato', ':idCategoria', ':idFase'),
      PATHS.dashboard.campeonatos.editFasePlayoffCategoria(':idCampeonato', ':idCategoria', ':idFase'),
      PATHS.dashboard.campeonatos.createPlayoff(':id'),
      PATHS.dashboard.novedades.root,
      PATHS.dashboard.novedades.list,
      PATHS.dashboard.novedades.create,
      PATHS.dashboard.novedades.edit(':id'),
      PATHS.dashboard.carrusel.root,
      PATHS.dashboard.carrusel.list,
      PATHS.dashboard.carrusel.create,
      PATHS.dashboard.carrusel.edit(':id'),      
    ],
  },
];
