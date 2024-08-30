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
import { EQUIPOS_MOCK } from 'src/models/Equipo';

export default function FixturePage() {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fixture - Categoria`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(params.id || '') },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FixtureManagerBase equipos={EQUIPOS_MOCK} />
        </Card>
      </Container>
    </>
  );
}
