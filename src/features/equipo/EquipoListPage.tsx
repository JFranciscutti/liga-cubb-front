import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { EquipoDataGrid } from './EquipoDataGrid';
import { useAllEquiposByCategory, useCreateEquipoMutation } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import ErrorPage from 'src/pages/ErrorPage';
import { enqueueSnackbar } from 'notistack';
import { NuevoEquipoForm } from './NuevoEquipoForm';

export default function EquiposListPage() {
  const params = useParams<{ idCampeonato: string; idCategoria: string }>();
  const confirm = useConfirm();

  const [createOpen, setCreateOpen] = useState(false);

  const navigate = useNavigate();
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
    refetch
  } = useAllEquiposByCategory(params.idCategoria || '');

  const createEquipoMutation = useCreateEquipoMutation();

  if (allEquiposLoading) {
    return <LoadingScreen />;
  }

  if (allEquiposError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Categoria ${allEquipos.categoryName} - Equipos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Categorias',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            {
              name: allEquipos.categoryName,
              href: PATHS.dashboard.campeonatos.manageCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              ),
            },
            {
              name: 'Equipos',
            },
          ]}
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
            data={allEquipos.teams || []}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => {},
              })
            }
            onEdit={(id: string) => {
              navigate(
                PATHS.dashboard.campeonatos.manageEquipoFromCategoria(
                  params.idCampeonato || '',
                  params.idCategoria || '',
                  id
                )
              );
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
            onSubmit={async (values) =>
              await createEquipoMutation.mutateAsync(
                {
                  logo: values.image,
                  name: values.name,
                  categoryId: params.idCategoria || '',
                },
                {
                  onSuccess: async () => {
                    enqueueSnackbar({ variant: 'success', message: 'Equipo creado correctamente' });
                    setCreateOpen(false);
                    await refetch();
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
