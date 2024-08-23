// routes
import { PATHS } from '../../../routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/features/auth/useAuthContext';
import { isPathAuthorized } from 'src/features/auth/utils';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const iconifyIcon = (name: string) => (
  <Iconify
    icon={name}
    sx={{
      width: 1,
      height: 1,
    }}
  />
);

const ICONS = {
  account: iconifyIcon('eva:person-outline'),
  usuarios: iconifyIcon('mdi:people-group'),
  equipos: iconifyIcon('entypo:sports-club'),
  categorias: iconifyIcon('mdi:soccer'),
  jugadores: iconifyIcon('mdi:people-group'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'LIGA CUBB',
    items: [
      {
        title: 'Campeonatos',
        path: PATHS.dashboard.campeonatos.root,
        icon: ICONS.categorias,
      },
      // {
      //   title: 'Categorias',
      //   path: PATHS.dashboard.categorias.root,
      //   icon: ICONS.categorias,
      // },
      // {
      //   title: 'Equipos',
      //   path: PATHS.dashboard.equipos.root,
      //   icon: ICONS.equipos,
      // },
      {
        title: 'Jugadores',
        path: PATHS.dashboard.jugadores.root,
        icon: ICONS.jugadores,
      },
    ],
  },
];

const useNavConfig = () => {
  const authCtx = useAuthContext();
  const visibleNavConfig: typeof navConfig = [];
  navConfig.forEach((nav) => {
    const visibleItems = nav.items.filter((item) => isPathAuthorized(authCtx.roles, item.path));
    if (visibleItems.length > 0) {
      visibleNavConfig.push({
        ...nav,
        items: visibleItems,
      });
    }
  });
  return visibleNavConfig;
};

export default useNavConfig;
