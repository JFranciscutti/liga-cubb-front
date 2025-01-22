import { Button, Card, Container, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import LoadingScreen from 'src/components/loading-screen';
import ErrorPage from 'src/pages/ErrorPage';
import { NovedadDataGrid } from './NovedadesDataGrid';
import { PATHS } from 'src/routes/paths';
import { useAllNovedadesQuery, useDeleteNovedadMutation } from 'src/api/NovedadesRepository';
import { enqueueSnackbar } from 'notistack';

export default function JugadoresListPage() {
  const confirm = useConfirm();

  const navigate = useNavigate();
  const {
    data: allNovedades,
    isLoading: allNovedadesLoading,
    isError: allNovedadesError,
  } = useAllNovedadesQuery();

  const { mutateAsync: deleteNovedad } = useDeleteNovedadMutation(); 

  if (allNovedadesLoading) {
    return <LoadingScreen />;
  }

  if (allNovedadesError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Novedades | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Novedades"
          links={[{ name: 'Listado' }]}
          action={
              <Button
                onClick={() => navigate(PATHS.dashboard.novedades.create)}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Nueva novedad
              </Button>
          }
        />

        <Card>
          <NovedadDataGrid
            data={allNovedades || []}
            isLoading={allNovedadesLoading}
            onDelete={(id: any) =>
              confirm({
                action: async () => {
                  await deleteNovedad(id);
                  enqueueSnackbar({ message: 'Novedad eliminada correctamente' });
                },
              })
            }
            onEdit={(id: string) => {
              navigate(PATHS.dashboard.novedades.edit(id));
            }}
          />
        </Card>
      </Container>     
    </>
  );
}