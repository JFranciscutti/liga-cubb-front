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
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'LIGA CUBB',
    items: [
      {
        title: 'Usuarios',
        path: PATHS.dashboard.usuarios.root,
        icon: ICONS.usuarios,
      },
      {
        title: 'Categorias',
        path: PATHS.dashboard.categorias.root,
        icon: ICONS.categorias,
      },
      {
        title: 'Equipos',
        path: PATHS.dashboard.equipos.root,
        icon: ICONS.equipos,
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
