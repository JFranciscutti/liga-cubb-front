import { Box, Card, Container, Grid } from '@mui/material';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import {
  useAllEquiposByCategory,
  useAllEquiposByCopa,
  useAllEquiposQuery,
} from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import FaseGruposGenerator from './components/FaseGruposGenerator';

const ManageGruposCopaPage = () => {
  const params = useParams<{idCampeonato: string, idCategoria: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.idCampeonato || ''
  );

  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposByCopa(params.idCampeonato || '');

  if (campeonatoLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Fase de grupos`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.campeonatos.list },
            { name: 'Administrar', href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || '') },
            { name: 'Fase de grupos' },
          ]}
        />
        <Card>
          <FaseGruposGenerator equipos={allEquipos.teams || []} />
        </Card>
      </Container>
    </>
  );
};

export default ManageGruposCopaPage;
