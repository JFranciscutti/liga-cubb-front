import { Container, Button, Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { CampeonatoDataGrid } from './CampeonatoDataGrid';
import { enqueueSnackbar } from 'notistack';
import DialogHeader from 'src/components/DialogHeader';
import { useState } from 'react';
import { CampeonatoForm } from './CampeonatoForm';
import { useAllCampeonatosQuery, useCreateCampeonatoMutation, useMarkAsMainMutation, useSwitchStatusMutation } from 'src/api/CampeonatoRepository';

const CampeonatosPage = () => {
  const { data: campeonatos } = useAllCampeonatosQuery();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const createCampeonatoMutation = useCreateCampeonatoMutation();
  const switchStatusMutation = useSwitchStatusMutation();
  const markAsMainMutation = useMarkAsMainMutation();

  return (
    <>
      <Helmet>
        <title>Campeonatos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Campeonatos"
          links={[{ name: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setCreateOpen(true)}
            >
              Nuevo campeonato
            </Button>
          }
        />

        <Card>
          <CampeonatoDataGrid
            data={campeonatos}
            isLoading={false}
            onDelete={async (id: any) => {
              await switchStatusMutation.mutateAsync(id);
              enqueueSnackbar('Estado actualizado correctamente', { variant: 'success' });
            } }
            onMarkAsMain={async(id: any) => {
              await markAsMainMutation.mutateAsync(id);
              enqueueSnackbar('Torneo regular marcado como principal', { variant: 'success' });
            }}
          />
        </Card>
      </Container>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>
          <DialogHeader label="Nuevo campeonato" onClick={() => setCreateOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4 }}>
          <CampeonatoForm
            onSubmit={async (values) => {
              await createCampeonatoMutation.mutateAsync(
                { ...values, year: Number(values.year)},
                {
                  onSuccess: () => {
                    setCreateOpen(false);
                    enqueueSnackbar('Campeonato creado correctamente', { variant: 'success' });
                  },
                }
              );
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampeonatosPage;
