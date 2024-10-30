import { Box, Card, Container, IconButton, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import EditCreatedFixture from './EditCreatedFixture';
import { useOneFaseQuery } from 'src/api/CategoriaRepository';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

export default function EditFixturePage() {
  const params = useParams();
  const [selectedFecha, setSelectedFecha] = useState<number>(1);
  const { data, isLoading, isError } = useOneFaseQuery(params.idFase || '', selectedFecha);

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
            { name: 'Fixture' },
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
          <Box className="flex w-full p-4 justify-between items-center">
            <IconButton
              disabled={selectedFecha === 1}
              onClick={() => setSelectedFecha((prev) => prev - 1)}
            >
              <Iconify icon={'ion:caret-back'} />
            </IconButton>
            <Typography className="font-bold">Fecha {selectedFecha}</Typography>
            <IconButton
              disabled={selectedFecha === 15}
              onClick={() => setSelectedFecha((prev) => prev + 1)}
            >
              <Iconify icon={'ion:caret-forward'} />
            </IconButton>
          </Box>
          <EditCreatedFixture fecha={data || []} isLoading={isLoading} />
        </Card>
      </Container>
    </>
  );
}
