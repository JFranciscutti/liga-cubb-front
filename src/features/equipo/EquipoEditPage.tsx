import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { NuevoEquipoForm } from './NuevoEquipoForm';
import { useEquipoQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import ErrorPage from 'src/pages/ErrorPage';
import { JugadorDataGrid } from '../jugadores/JugadoresDataGrid';
import Iconify from 'src/components/iconify';
import { enqueueSnackbar } from 'notistack';
import DialogHeader from 'src/components/DialogHeader';
import { NuevoJugadorForm } from '../jugadores/NuevoJugadorForm';
import { useState } from 'react';
import SelectJugadoresForm, { CargarJugadorFormType } from './components/SelectJugadoresForm';
import { useAllJugadoresQuery } from 'src/api/JugadoresRepository';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';

const EquipoEditPage = () => {
  const params = useParams<{ idCampeonato: string; idCategoria: string; idEquipo: string }>();

  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.idCampeonato || ''
  );

  const categoriaName =
    campeonatoData?.categories?.filter((c: any) => c.id === params.idCategoria)[0].name || '';

  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const [loadOpen, setLoadOpen] = useState<boolean>(false);
  const {
    data: equipoData,
    isLoading: equipoLoading,
    isError: equipoError,
  } = useEquipoQuery(params.idEquipo || '');

  const {
    data: jugadoresData,
    isLoading: jugadoresLoading,
    isError: jugadoresError,
  } = useAllJugadoresQuery();

  if (equipoLoading || jugadoresLoading) {
    return <LoadingScreen />;
  }

  if (equipoError || jugadoresError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <CustomBreadcrumbs
          sx={{ mb: 1 }}
          heading={equipoData.name}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Categorias',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            {
              name: categoriaName,
              href: PATHS.dashboard.campeonatos.manageCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              ),
            },
            {
              name: 'Equipos',
              href: PATHS.dashboard.campeonatos.manageEquiposCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              ),
            },
            {
              name: equipoData.name,
            },
          ]}
        />
        <Card sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h4">Información del equipo</Typography>
          </Box>
          <NuevoEquipoForm
            edit
            onSubmit={async () => {}}
            initialValues={{
              name: equipoData.name,
              image: equipoData.logoUrl,
            }}
          />
        </Card>

        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <CustomBreadcrumbs
            heading="Lista de buena fé"
            links={[{ name: '' }]}
            sx={{ mb: 4 }}
            action={
              <Stack flexDirection={'row'} gap={5}>
                <Button
                  onClick={() => setLoadOpen(true)}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Cargar Jugadores
                </Button>
              </Stack>
            }
          />
          <JugadorDataGrid
            data={[]}
            isLoading={equipoLoading}
            onDelete={function (id: number) {
              throw new Error('Function not implemented.');
            }}
          />
        </Card>
      </Container>
      <Dialog
        open={loadOpen}
        onClose={() => setLoadOpen(false)}
        PaperProps={{ style: { width: '100%' } }}
      >
        <DialogTitle>
          <DialogHeader label="Cargar jugadores" onClick={() => setLoadOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4, width: '100%' }}>
          <SelectJugadoresForm onSubmit={async (values) => {}} jugadores={jugadoresData} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EquipoEditPage;
