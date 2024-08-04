import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen';
import MatchForm from './MatchForm';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';
import FixtureManagerByGroup from '../copa/components/FixtureManagerByGroup';
import FixtureManagerBase from './FixtureManagerBase';

export default function FixturePage() {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const {
    data: categoriaData,
    isLoading: categoriaLoading,
    isError: categoriaError,
  } = useCategoriaQuery(Number(params.id));
  const {
    data: equiposData,
    isLoading: equiposLoading,
    isError: equiposError,
  } = useAllEquiposQuery();

  if (categoriaLoading || equiposLoading) {
    return <LoadingScreen />;
  }
  if (categoriaLoading || equiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fixture - Categoria ${categoriaData.nombre}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(Number(params.id)) },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FixtureManagerBase equipos={equiposData} />
        </Card>
      </Container>
    </>
  );
}
