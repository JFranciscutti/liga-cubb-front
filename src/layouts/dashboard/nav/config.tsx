// routes
import { PATHS } from '../../../routes/paths';
// components
import Iconify from 'src/components/iconify';
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
      {
        title: 'Jugadores',
        path: PATHS.dashboard.jugadores.root,
        icon: ICONS.jugadores,
      },
    ],
  },
];

const useNavConfig = () => {
  const visibleNavConfig: typeof navConfig = [];
  navConfig.forEach((nav) => {
    if (nav.items.length > 0) {
      visibleNavConfig.push({
        ...nav,
        items: nav.items,
      });
    }
  });
  return visibleNavConfig;
};

export default useNavConfig;
