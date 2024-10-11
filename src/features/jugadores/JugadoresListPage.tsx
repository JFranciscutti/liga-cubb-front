import { Button, Card, Container, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';
// import { NuevoJugadorForm } from './NuevoJugadorForm';
// import { JugadoresDataGrid } from './JugadoresDataGrid';
// import {
//   useAllJugadoresQuery,
//   useCreateJugadorMutation,
//   useEditJugadorMutation,
// } from 'src/api/JugadorRepository';
import LoadingScreen from 'src/components/loading-screen';
import { enqueueSnackbar } from 'notistack';
import { useAllCategoriasQuery } from 'src/api/CategoriaRepository';
import ErrorPage from 'src/pages/ErrorPage';
import { JugadorDataGrid } from './JugadoresDataGrid';
import {
  ICreateJugador,
  useAllJugadoresQuery,
  useCreateJugadoresListMutation,
  useCreateJugadorMutation,
  useEditJugadorMutation,
} from 'src/api/JugadoresRepository';
import { CargarJugadoresModal } from './CargarJugadoresModal';
import { Jugador } from 'src/models/Jugador';
import { GeneroEnum } from 'src/utils/enums';
import { NuevoJugadorForm } from './NuevoJugadorForm';
import { parse } from 'date-fns';

export default function JugadoresListPage() {
  const confirm = useConfirm();

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();

  const navigate = useNavigate();
  const {
    data: allJugadores,
    isLoading: allJugadoresLoading,
    isError: allJugadoresError,
  } = useAllJugadoresQuery();

  const createJugadorMutation = useCreateJugadorMutation();
  const createListJugadoresMutation = useCreateJugadoresListMutation();
  const editarJugadorMutation = useEditJugadorMutation();

  const foundJugador = allJugadores?.find((j) => j.id === selectedId);
  const parsedJugador =
    foundJugador === undefined
      ? undefined
      : {
          ...foundJugador,
        };

  if (allJugadoresLoading) {
    return <LoadingScreen />;
  }

  if (allJugadoresError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Jugadores | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Jugadores"
          links={[{ name: 'Listado' }]}
          action={
            <Stack flexDirection={'row'} gap={5}>
              <Button
                onClick={() => setLoadOpen(true)}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Cargar lista de jugadores
              </Button>
              <Button
                onClick={() => setCreateOpen(true)}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Nuevo Jugador
              </Button>
            </Stack>
          }
        />

        <Card>
          <JugadorDataGrid
            data={allJugadores}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => {},
              })
            }
            onEdit={(id: string) => {
              setSelectedId(id);
              setEditOpen(true);
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
          <DialogHeader label="Nuevo jugador" onClick={() => setCreateOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4, width: '100%' }}>
          <NuevoJugadorForm
            onSubmit={async (values) =>
              await createJugadorMutation.mutateAsync(
                {
                  nombre: values.name,
                  apellido: values.apellido,
                  nro_socio: values.nro_socio,
                  gender: values.genero,
                },
                {
                  onSuccess: () => {
                    enqueueSnackbar({
                      variant: 'success',
                      message: 'Jugador creado correctamente',
                    });
                    setCreateOpen(false);
                  },
                }
              )
            }
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperProps={{ style: { width: '100%' } }}
      >
        <DialogTitle>
          <DialogHeader label="Editar jugador" onClick={() => setEditOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4, width: '100%' }}>
          <NuevoJugadorForm
            edit
            initialValues={{
              ...parsedJugador,
              name: parsedJugador?.nombre || '',
              apellido: parsedJugador?.apellido || '',
              genero: parsedJugador?.genero || '',
              nro_socio: parsedJugador?.nro_socio || '',
            }}
            onSubmit={async (values) =>
              await editarJugadorMutation.mutateAsync(
                {
                  id: selectedId!,
                  nombre: values.name,
                  apellido: values.apellido,
                  nro_socio: values.nro_socio,
                  gender: values.genero,
                },
                {
                  onSuccess: () => {
                    enqueueSnackbar({
                      variant: 'success',
                      message: 'Jugador editado correctamente',
                    });
                    setEditOpen(false);
                  },
                }
              )
            }
          />
        </DialogContent>
      </Dialog>
      <CargarJugadoresModal
        open={loadOpen}
        onClose={() => setLoadOpen(false)}
        onComplete={async (data: UploadCSVProps) => {
          await createListJugadoresMutation.mutateAsync(
            data.rows.map(
              ({ values }): ICreateJugador => ({
                nombre: values.nombre,
                apellido: values.apellido,
                gender: values.genero === 'F' ? GeneroEnum.FEMENINO : GeneroEnum.MASCULINO,
                nro_socio: values.nro_socio,
              })
            ),
            {
              onSuccess: () => {
                enqueueSnackbar({
                  variant: 'success',
                  message: 'Jugadores creados correctamente',
                });
                setLoadOpen(false);
              },
            }
          );
        }}
      />
    </>
  );
}

interface UploadCSVProps {
  columns: { key: string; name: string }[];
  error: any;
  num_columns: number;
  num_rows: number;
  rows: { index: number; values: any }[];
}
