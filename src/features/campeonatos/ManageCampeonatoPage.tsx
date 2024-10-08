import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import CategoriaListPage from '../categoria/CategoriaListPage';
import { useNavigate, useParams } from 'react-router';
import { CampeonatoTypeEnum } from 'src/models/Campeonato';
import ManageCopaPage from '../copa/ManageCopaPage';
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
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import { LoadingSpinner } from 'src/components/loading-spinner';
import ErrorPage from 'src/pages/ErrorPage';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';

const ManageCampeonatoPage = () => {
  const { id } = useParams();
  const { data: campeonato, isLoading, isError } = useCampeonatoQuery(id || '');
  const { themeStretch } = useSettingsContext();
  const [loadOpen, setLoadOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (campeonato.type === CampeonatoTypeEnum.REGULAR) {
    return <CategoriaListPage campeonato={campeonato} />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={campeonato.name}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
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

        <ManageCopaPage id={id || ''} />
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
              onClick={() => navigate(PATHS.dashboard.campeonatos.createFaseGrupos(id || ''))}
            >
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
              onClick={() => navigate(PATHS.dashboard.categorias.createFasePlayoff(id || ''))}
            >
              <div className="flex flex-col gap-2">
                <Typography fontSize={18}>Fase Playoff</Typography>
                <Typography variant="subtitle1" className="line-clamp-1">
                  Cruces playoff
                </Typography>
              </div>
            </Card>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ManageCampeonatoPage;
