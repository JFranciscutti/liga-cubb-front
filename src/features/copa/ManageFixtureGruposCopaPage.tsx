import { Container } from '@mui/material';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';

const ManageFixtureGruposCopaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.id || ''
  );
  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposQuery();

  if (campeonatoLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Fixture de fase de grupos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: campeonatoData.name,
              href: PATHS.dashboard.campeonatos.manage(params.id!),
            },
            { name: 'Fixture de fase de grupos' },
          ]}
        />
      </Container>
    </>
  );
};

export default ManageFixtureGruposCopaPage;
