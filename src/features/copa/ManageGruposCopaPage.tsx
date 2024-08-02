import { Box, Card, Container, Grid } from '@mui/material';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import FaseGruposGenerator from './FaseGruposGenerator';

const ManageGruposCopaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    Number(params.id)
  );
  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposQuery();

  if (campeonatoLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Fase de grupos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: campeonatoData.name,
              href: PATHS.dashboard.campeonatos.manage(params.id!),
            },
            { name: 'Fase de grupos' },
          ]}
        />
        <Card>
          <FaseGruposGenerator equipos={allEquipos} />
        </Card>
      </Container>
    </>
  );
};

export default ManageGruposCopaPage;
