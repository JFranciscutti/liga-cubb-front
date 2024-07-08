import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { NuevoEquipoForm } from './NuevoEquipoForm';
import { EquipoDataGrid } from './EquipoDataGrid';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';

export default function EquiposListPage() {
  //const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();

  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();
  const { data: allEquipos } = useAllEquiposQuery();

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Categorias"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              onClick={() => setCreateOpen(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo equipo
            </Button>
          }
        />

        <Card>
          <EquipoDataGrid
            data={allEquipos}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => {},
              })
            }
            onEdit={(id: number) => {
              navigate(PATHS.dashboard.equipos.edit(id));
            }}
          />
        </Card>
      </Container>
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        PaperProps={{ style: { width: '100%' } }}
      >
        <DialogTitle>
          <DialogHeader label="Nuevo equipo" onClick={() => setCreateOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4, width: '100%' }}>
          <NuevoEquipoForm onSubmit={async () => {}} />
        </DialogContent>
      </Dialog>
    </>
  );
}
