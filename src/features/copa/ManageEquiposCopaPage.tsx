import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import DialogHeader from 'src/components/DialogHeader';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useState } from 'react';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { EquipoDataGrid } from '../equipo/EquipoDataGrid';
import {
  useAllEquiposByCopa,
  useCreateEquipoCopaMutation,
  useDeleteEquipoMutation,
} from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import { enqueueSnackbar } from 'notistack';
import { NuevoEquipoForm } from '../equipo/NuevoEquipoForm';

const ManageEquiposCopaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [createOpen, setCreateOpen] = useState(false);
  const createEquipoMutation = useCreateEquipoCopaMutation();
  const deleteEquipoMutation = useDeleteEquipoMutation();

  const { data: allEquipos, refetch: refetchAllEquipos } = useAllEquiposByCopa(params.id || '');

  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.id || ''
  );

  if (campeonatoLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Lista de equipos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: campeonatoData.name,
              href: PATHS.dashboard.campeonatos.manage(params.id!),
            },
            { name: 'Administrar equipos' },
          ]}
          action={
            <Button
              onClick={() => setCreateOpen(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Agregar equipo
            </Button>
          }
        />
        <Card>
          <EquipoDataGrid
            data={allEquipos.teams || []}
            isLoading={false}
            onEdit={(id: string) =>
              navigate(PATHS.dashboard.campeonatos.manageOneEquipoCopa(campeonatoData.id, id))
            }
            onDelete={(id: string) =>
              confirm({
                action: async () => {
                  await deleteEquipoMutation.mutateAsync(id);
                  enqueueSnackbar({
                    variant: 'success',
                    message: 'Equipo eliminado correctamente',
                  });
                  refetchAllEquipos();
                },
              })
            }
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
            gender={"male"}
            onSubmit={async (values) =>
              await createEquipoMutation.mutateAsync(
                {
                  logo: values.image,
                  name: values.name,
                  cupId: params.id!,
                },
                {
                  onSuccess: async () => {
                    enqueueSnackbar({ variant: 'success', message: 'Equipo creado correctamente' });
                    setCreateOpen(false);
                    //await refetch();
                  },
                }
              )
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageEquiposCopaPage;
