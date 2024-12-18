import { Container, Card } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useOneFasePlayoffQuery } from 'src/api/CategoriaRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import PlayoffFixtureNavigator from './components/PlayoffFixtureNavigator';
import CuadroPlayoff from './components/CuadroPlayoff';

const EditPlayoffPage: React.FC = () => {
  const params = useParams();
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
            { name: 'Listado', href: PATHS.dashboard.campeonatos.list },
            {
              name: 'Administrar',
              href: PATHS.dashboard.campeonatos.manageCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              ),
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
          <CuadroPlayoff rondas={data || []} />
          <PlayoffFixtureNavigator rounds={data || []} />
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffPage;
