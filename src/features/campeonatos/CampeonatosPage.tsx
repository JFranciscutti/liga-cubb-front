import { Container, Button, Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { CampeonatoDataGrid } from './CampeonatoDataGrid';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { enqueueSnackbar } from 'notistack';
import DialogHeader from 'src/components/DialogHeader';
import { CategoriaForm } from '../categoria/CategoriaForm';
import { useState } from 'react';
import { CampeonatoForm } from './CampeonatoForm';

export const CampeonatosPage = () => {
  const [createOpen, setCreateOpen] = useState<boolean>(false);

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
            data={[
              { id: 1, name: 'Liga 2024' },
              { id: 2, name: 'Copa Preparación 2024' },
            ]}
            isLoading={false}
            onDelete={(id: any) => {}}
            onEdit={(id: number) => {}}
          />
        </Card>
      </Container>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>
          <DialogHeader label="Nuevo campeonato" onClick={() => setCreateOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4 }}>
          <CampeonatoForm onSubmit={async () => {}} />
        </DialogContent>
      </Dialog>
    </>
  );
};
