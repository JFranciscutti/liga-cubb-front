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
import {
  useAllEquiposQuery,
  useCreateEquipoMutation,
  useEditEquipoMutation,
} from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { enqueueSnackbar } from 'notistack';
import { useAllCategoriasQuery } from 'src/api/CategoriaRepository';
import ErrorPage from 'src/pages/ErrorPage';

export default function EquiposListPage() {
  const confirm = useConfirm();

  const [createOpen, setCreateOpen] = useState(false);

  const navigate = useNavigate();
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
  } = useAllEquiposQuery();

  const {
    data: allCategorias,
    isLoading: allCategoriasLoading,
    isError: allCategoriasError,
  } = useAllCategoriasQuery();

  const createEquipoMutation = useCreateEquipoMutation();

  if (allEquiposLoading || allCategoriasLoading) {
    return <LoadingScreen />;
  }

  if (allEquiposError || allCategoriasError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Equipos"
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
          <NuevoEquipoForm
            categories={allCategorias}
            onSubmit={async (values) =>
              await createEquipoMutation.mutateAsync(
                {
                  logo: '',
                  name: values.name,
                  gender: values.genero,
                },
                {
                  onSuccess: () => {
                    enqueueSnackbar({ variant: 'success', message: 'Equipo creado correctamente' });
                    setCreateOpen(false);
                  },
                }
              )
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
