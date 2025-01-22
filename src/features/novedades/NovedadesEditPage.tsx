import { Container, Card, FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { NovedadForm, NovedadFormType } from './NovedadForm';
import {
  useCreateNovedadMutation,
  useEditNovedadMutation,
  useNovedadQuery,
  usePublicarNovedadMutation,
} from 'src/api/NovedadesRepository';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import ErrorPage from 'src/pages/ErrorPage';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';

const NovedadesEditPage: React.FC = () => {
  const { id: novedadId } = useParams<{ id: string }>();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const {
    data: novedadQuery,
    isLoading: isNovedadLoading,
    isError: isNovedadError,
  } = useNovedadQuery(novedadId!);

  const editarNovedadMutation = useEditNovedadMutation();
  const { mutateAsync: togglePublicarNovedad } = usePublicarNovedadMutation();


  const onSubmit = async (value: NovedadFormType) => {
    await editarNovedadMutation.mutateAsync({
      ...value,
      //@ts-ignore
      image: value.image === '' ? undefined : value.image,
      id: novedadId!,
    });
    navigate(PATHS.dashboard.novedades.list);
    enqueueSnackbar({ message: 'Novedad editada correctamente' });
  };

  const handleToggle = async () =>
    confirm({
        action: async () => {
            await togglePublicarNovedad(novedadId!);
        },
        content: '¿Estás seguro que querés cambiar el estado de esta novedad?',
        actionLabel: novedadQuery?.visible ? 'Desactivar' : 'Activar',
    });

  if (isNovedadLoading) {
    return <LoadingScreen />;
  }

  if (isNovedadError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Novedades | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Editar Novedad"
          links={[
            { name: 'Listado', href: PATHS.dashboard.novedades.list },
            { name: novedadQuery.title },
          ]}
          action={
            <FormControlLabel
                control={
                    <Switch
                        onClick={handleToggle}
                        checked={novedadQuery.visible || false}
                    />
                }
                label={novedadQuery.visible ? 'Activado' : 'Desactivado'}
            />
        }
        />

        <Card sx={{ p: 2 }}>
          <NovedadForm
            onSubmit={onSubmit}
            initialValues={{
              title: novedadQuery.title,
              description: novedadQuery.description,
              image: novedadQuery.image,
            }}
          />
        </Card>
      </Container>
    </>
  );
};

export default NovedadesEditPage;
