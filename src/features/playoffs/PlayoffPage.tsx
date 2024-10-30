import React from 'react';
import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCreateFasePlayoffMutation, useSaveFaseMutation } from 'src/api/CategoriaRepository';
import { useAllEquiposByCategory } from 'src/api/EquipoRepository';
import { enqueueSnackbar } from 'notistack';
import CreatePlayoff from './components/CreatePlayoff';

const PlayoffPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
    refetch,
  } = useAllEquiposByCategory(params.id || '');

  const saveFasePlayoff = useCreateFasePlayoffMutation();

  const handleSave = async (partidos: any[]) => {
    if (partidos.filter((p) => p.team1 === '' && p.team2 === '').length > 0) {
      enqueueSnackbar({ message: 'No se puede guardar una fase sin partidos', variant: 'error' });
      return;
    }

    await saveFasePlayoff.mutateAsync({
      partidos: partidos.map((p) => ({ homeTeamId: p.team1 || null, awayTeamId: p.team2 || null })),
      categoryId: params.id || '',
    });
    enqueueSnackbar({ message: 'Fase creada con éxito', variant: 'success' });
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Playoff - Categoria`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.campeonatos.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(params.id || '') },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CreatePlayoff
            equipos={allEquipos.teams.filter((_: any, i: number) => i < 12) || []}
            handleSave={handleSave}
          />
        </Card>
      </Container>
    </>
  );
};

export default PlayoffPage;
