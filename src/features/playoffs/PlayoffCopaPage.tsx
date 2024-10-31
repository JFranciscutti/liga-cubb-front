import React from 'react';
import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCreateFasePlayoffMutation } from 'src/api/CategoriaRepository';
import { useAllEquiposByCopa } from 'src/api/EquipoRepository';
import { enqueueSnackbar } from 'notistack';
import CreatePlayoff from './components/CreatePlayoff';
import { useCampeonatoQuery, useCreateFasePlayoffCopaMutation } from 'src/api/CampeonatoRepository';

const PlayoffCopaPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: campeonatoData } = useCampeonatoQuery(params.id || '');
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
    refetch,
  } = useAllEquiposByCopa(params.id || '');

  const saveFasePlayoff = useCreateFasePlayoffCopaMutation();

  const handleSave = async (partidos: any[], doubleMatch?: boolean) => {
    if (partidos.filter((p) => p.team1 === '' && p.team2 === '').length > 0) {
      enqueueSnackbar({ message: 'No se puede guardar una fase sin partidos', variant: 'error' });
      return;
    }

    await saveFasePlayoff.mutateAsync({
      partidos: partidos.map((p) => ({ homeTeamId: p.team1 || null, awayTeamId: p.team2 || null })),
      cupId: params.id || '',
      doubleMatch: !!doubleMatch,
    });
    enqueueSnackbar({ message: 'Fase creada con éxito', variant: 'success' });
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>{campeonatoData.name || 'Copa'} | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Playoff - ${campeonatoData?.name}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.campeonatos.list },
            { name: 'Administrar', href: PATHS.dashboard.campeonatos.manage(params.id || '') },
            { name: 'Crear playoff' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CreatePlayoff equipos={allEquipos.teams || []} handleSave={handleSave} />
        </Card>
      </Container>
    </>
  );
};

export default PlayoffCopaPage;
