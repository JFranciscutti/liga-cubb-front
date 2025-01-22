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
  carrusel: iconifyIcon('material-symbols-light:view-carousel-outline'),
  categorias: iconifyIcon('mdi:soccer'),
  jugadores: iconifyIcon('mdi:people-group'),
  novedades: iconifyIcon('bx:news'),
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
      {
        title: 'Novedades',
        path: PATHS.dashboard.novedades.root,
        icon: ICONS.novedades,
      },
      // {
      //   title: 'Carrusel de Imagenes',
      //   path: PATHS.dashboard.carrusel.root,
      //   icon: ICONS.carrusel,
      // },
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
