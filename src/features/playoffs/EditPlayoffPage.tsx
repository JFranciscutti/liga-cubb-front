import { Container, Card } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useOneFasePlayoffQuery } from 'src/api/CategoriaRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import CuadroPlayoffV2 from './components/CuadroPlayoffV2';
import PlayoffFixtureNavigator from './components/PlayoffFixtureNavigator';

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
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
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
          <CuadroPlayoffV2 rondas={data || []} />
          <PlayoffFixtureNavigator rounds={data || []} />
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffPage;
