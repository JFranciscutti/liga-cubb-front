import {
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import ManageCategoriaPage from './ManageCategoriaPage';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';

const CategoriaEditPage = () => {
  const params = useParams<{ idCampeonato: string; idCategoria: string }>();
  const navigate = useNavigate();

  const [loadOpen, setLoadOpen] = useState<boolean>(false);
  const { themeStretch } = useSettingsContext();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.idCampeonato || ''
  );

  const categoriaName =
    campeonatoData?.categories?.filter((c: any) => c.id === params.idCategoria)[0].name || '';

  if (campeonatoLoading) {
    return <LoadingScreen />;
  }

  useEffect(()=> {
    localStorage.setItem('idCampeonato', params.idCampeonato || '');
    localStorage.setItem('idCategoria', params.idCategoria || '');
  },[params.idCampeonato]);

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Categoria ${categoriaName}`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Categorías',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            { name: 'Administrar' },
          ]}
          action={
            <Stack flexDirection={'row'} gap={5}>
              <Button
                onClick={() => setLoadOpen(true)}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Nueva fase
              </Button>
            </Stack>
          }
        />

        <ManageCategoriaPage id={params.idCategoria || ''} />
      </Container>
      <Dialog
        open={loadOpen}
        onClose={() => setLoadOpen(false)}
        PaperProps={{ style: { width: '100%' } }}
      >
        <DialogTitle>
          <DialogHeader label="Crear fase" onClick={() => setLoadOpen(false)} />
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', mb: 4, width: '100%', gap: 3 }}
        >
          <Grid item xs={12}>
            <Card
              className="bg-sky-800"
              sx={{ p: 2, cursor: 'pointer' }}
              onClick={() =>
                navigate(PATHS.dashboard.categorias.createFaseRegular(params.idCategoria || ''))
              }
            >
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Fase regular</Typography>
                <Typography variant="subtitle1" className="line-clamp-1">
                  Torneo regular, todos contra todos.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="bg-sky-800" sx={{ p: 2, cursor: 'pointer' }} onClick={() => {}}>
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Fase de grupos</Typography>
                <Typography variant="subtitle1" className="line-clamp-1">
                  Fase de grupos para playoffs
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              className="bg-sky-800"
              sx={{ p: 2, cursor: 'pointer' }}
              onClick={() =>
                navigate(PATHS.dashboard.categorias.createFasePlayoff(params.idCategoria || ''))
              }
            >
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Fase Playoff</Typography>
                <Typography variant="subtitle1" className="line-clamp-1">
                  Cruces playoff
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="bg-sky-800" sx={{ p: 2, cursor: 'pointer' }} onClick={() => {}}>
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Fase Cuadrangular</Typography>
                <Typography variant="subtitle1" className="line-clamp-1">
                  Cuadrangular de descenso
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="bg-sky-800" sx={{ p: 2, cursor: 'pointer' }} onClick={() => {}}>
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Final del año</Typography>
              </div>
            </Card>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoriaEditPage;
