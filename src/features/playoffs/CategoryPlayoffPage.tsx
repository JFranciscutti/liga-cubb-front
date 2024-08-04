import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen';

export default function CategoriaPlayoffPage() {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: categoriaData, isLoading: categoriaLoading } = useCategoriaQuery(Number(params.id));

  if (categoriaLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Playoffs - Categoria ${categoriaData.nombre}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(Number(params.id)) },
            { name: 'Cruces playoff' },
          ]}
        />

        <Card
          sx={{ display: 'flex', justifyContent: 'center', py: 20, alignItems: 'center' }}
        ></Card>
      </Container>
    </>
  );
}
