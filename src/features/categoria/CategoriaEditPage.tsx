import { Card, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import ManageCategoriaPage from './ManageCategoriaPage';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

const CategoriaEditPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: categoriaData, isLoading: categoriaLoading } = useCategoriaQuery(Number(params.id));

  if (categoriaLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Categoria ${categoriaData.nombre}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar' },
          ]}
        />

        <ManageCategoriaPage id={categoriaData.id} />
      </Container>
    </>
  );
};

export default CategoriaEditPage;
