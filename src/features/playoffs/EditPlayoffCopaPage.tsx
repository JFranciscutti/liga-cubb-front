import { Container, Card, Box, Button, Grid, Typography, Divider, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import CuadroPlayoffV2 from './components/CuadroPlayoffV2';
import { useOneFasePlayoffCopaQuery } from 'src/api/CampeonatoRepository';
import Iconify from 'src/components/iconify';
import PlayoffFixtureNavigator from './components/PlayoffFixtureNavigator';

const EditPlayoffCopaPage: React.FC = () => {
  const params = useParams<{ idCampeonato: string; idFase: string }>();
  const { data, isLoading, isError } = useOneFasePlayoffCopaQuery(params.idFase || '');

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Copa  `}
          links={[
            { name: 'Listado', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Administrar',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            { name: 'Playoff' },
          ]}
        />

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CuadroPlayoffV2 rondas={data || []} />
          <PlayoffFixtureNavigator rounds={data || []} />
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffCopaPage;
