import { Container, Card } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useOneFasePlayoffQuery, useOneFaseQuery } from 'src/api/CategoriaRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import EditCreatedFixture from '../fixtures/EditCreatedFixture';
import CuadroPlayoff from './components/CuadroPlayoff';
import CuadroPlayoffV2 from './components/CuadroPlayoffV2';

const EditPlayoffPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOneFasePlayoffQuery(params.id || '');

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fixture - Categoria`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(params.id || '') },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CuadroPlayoffV2 rondas={data || []} />
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffPage;
