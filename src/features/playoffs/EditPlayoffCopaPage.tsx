import { Container, Card } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useOneFasePlayoffCopaQuery } from 'src/api/CampeonatoRepository';
import PlayoffFixtureNavigator from './components/PlayoffFixtureNavigator';
import CuadroPlayoff from './components/CuadroPlayoff';

const EditPlayoffCopaPage: React.FC = () => {
  const params = useParams<{ idCampeonato: string; idFase: string }>();
  const { data } = useOneFasePlayoffCopaQuery(params.idFase || '');

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
          {/*@ts-ignore */}
          <CuadroPlayoff rondas={data || []} />
          <PlayoffFixtureNavigator rounds={data || []} />
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffCopaPage;
