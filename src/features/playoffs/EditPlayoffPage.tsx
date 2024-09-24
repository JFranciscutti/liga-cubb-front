import { Container, Card, Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Round, useOneFasePlayoffQuery } from 'src/api/CategoriaRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import CuadroPlayoffV2 from './components/CuadroPlayoffV2';
import EditCreatedFixture from '../fixtures/EditCreatedFixture';

const EditPlayoffPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOneFasePlayoffQuery(params.id || '');

  const idCampeonato = localStorage.getItem('idCampeonato') || '';
  const idCategoria = localStorage.getItem('idCategoria') || '';


  const octavos: Round = data[0];
  const cuartos: Round = data[1];
  const semis: Round = data[2];
  const final: Round = data[3];

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
            {
              name: 'Administrar',
              href: PATHS.dashboard.campeonatos.manageCategoria(idCampeonato, idCategoria),
            },
            { name: 'Playoff' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CuadroPlayoffV2 rondas={data || []} />
        </Card>
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffPage;



