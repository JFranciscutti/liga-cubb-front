import { Card, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import ManageCategoriaPage from './ManageCategoriaPage';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';

const CategoriaEditPage = () => {
  const params = useParams<{ idCampeonato: string; idCategoria: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.idCampeonato || ''
  );

  const categoriaName =
    campeonatoData?.categories?.filter((c: any) => c.id === params.idCategoria)[0].name || '';

  if (campeonatoLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Categoria ${categoriaName}`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Categorías',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            { name: 'Administrar' },
          ]}
        />

        <ManageCategoriaPage id={params.idCategoria || ''} />
      </Container>
    </>
  );
};

export default CategoriaEditPage;
