import { Container, Card } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { NovedadForm, NovedadFormType } from './NovedadForm';
import { useCreateNovedadMutation } from 'src/api/NovedadesRepository';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

const NovedadesCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createNovedadMutation = useCreateNovedadMutation();

  const onSubmit = async (value: NovedadFormType) => {
    await createNovedadMutation.mutateAsync({
      ...value,
      //@ts-ignore
      image: value.image === '' ? undefined : value.image,
    });
    navigate(PATHS.dashboard.novedades.list);
    enqueueSnackbar({ message: 'Novedad creada correctamente' });
  };

  return (
    <>
      <Helmet>
        <title>Novedades | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Crear Novedad"
          links={[
            { name: 'Listado', href: PATHS.dashboard.novedades.list },
            { name: 'Crear novedad' },
          ]}
        />

        <Card sx={{ p: 2 }}>
          <NovedadForm onSubmit={onSubmit} />
        </Card>
      </Container>
    </>
  );
};

export default NovedadesCreatePage;
