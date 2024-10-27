import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import CreateFixture from './CreateFixture';
import { useSaveFaseMutation } from 'src/api/CategoriaRepository';
import { useAllEquiposByCategory } from 'src/api/EquipoRepository';
import { enqueueSnackbar } from 'notistack';

export default function FixturePage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
    refetch,
  } = useAllEquiposByCategory(params.idCategoria || '');

  const saveFaseMutation = useSaveFaseMutation();

  const handleSave = async (fechas: any[]) => {
    await saveFaseMutation.mutateAsync({ fechas: fechas, categoryId: params.idCategoria || '' });
    enqueueSnackbar({ message: 'Fase creada con éxito', variant: 'success' });
    navigate(PATHS.dashboard.categorias.edit(params.idCategoria || ''));
  };

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fixture - Categoria`}
          links={[
            {
              name: 'Listado',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            {
              name: 'Administrar',
              href: PATHS.dashboard.campeonatos.manageCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              ),
            },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CreateFixture equipos={allEquipos.teams || []} handleSave={handleSave} />
          {/* <EditCreatedFixture fechas={fechas} /> */}
        </Card>
      </Container>
    </>
  );
}
