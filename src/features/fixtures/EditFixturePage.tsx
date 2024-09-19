import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useAllEquiposByCategory } from 'src/api/EquipoRepository';
import EditCreatedFixture from './EditCreatedFixture';
import { useOneFaseQuery } from 'src/api/CategoriaRepository';

export default function EditFixturePage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOneFaseQuery(params.id || '');

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
          <EditCreatedFixture fechas={data || []} />
        </Card>
      </Container>
    </>
  );
}
