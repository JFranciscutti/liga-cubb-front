import { Card, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { NuevoEquipoForm } from './NuevoEquipoForm';
import { useEquipoQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import ErrorPage from 'src/pages/ErrorPage';
import { useAllCategoriasQuery } from 'src/api/CategoriaRepository';

const EquipoEditPage = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  const {
    data: equipoData,
    isLoading: equipoLoading,
    isError: equipoError,
  } = useEquipoQuery(Number(params.id));

  const {
    data: allCategorias,
    isLoading: allCategoriasLoading,
    isError: allCategoriasError,
  } = useAllCategoriasQuery();

  if (equipoLoading || allCategoriasLoading) {
    return <LoadingScreen />;
  }

  if (equipoError || allCategoriasError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Equipo"
          links={[{ name: 'Listado', href: PATHS.dashboard.equipos.list }, { name: 'Editar' }]}
        />
        <Card sx={{ p: 2 }}>
          <NuevoEquipoForm
            edit
            onSubmit={async () => {}}
            initialValues={{
              name: equipoData.nombre,
              genero: equipoData.genero,
              image: { file: equipoData.escudo },
            }}
            categories={allCategorias}
          />
        </Card>
      </Container>
    </>
  );
};

export default EquipoEditPage;
