import { Container, Card, Box, Button, Grid, Typography, Divider } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Round, RoundMatch, useOneFasePlayoffQuery } from 'src/api/CategoriaRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import CuadroPlayoffV2 from './components/CuadroPlayoffV2';
import EditCreatedFixture from '../fixtures/EditCreatedFixture';
import Image from 'src/components/image';

const EditPlayoffPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOneFasePlayoffQuery(params.id || '');

  const idCampeonato = localStorage.getItem('idCampeonato') || '';
  const idCategoria = localStorage.getItem('idCategoria') || '';

  const octavos: Round = data[3];
  const cuartos: Round = data[2];
  const semis: Round = data[1];
  const final: Round = data[0];

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

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CuadroPlayoffV2 rondas={data || []} />

          <Typography>Octavos</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              p: 4,
            }}
          >
            {octavos.matchesPlayoff.map((partido, index) => (
              <Rounds partido={partido} index={index} />
            ))}
          </Box>

          <Typography>Cuartos</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              p: 4,
            }}
          >
            {cuartos.matchesPlayoff.map((partido, index) => (
              <Rounds partido={partido} index={index} />
            ))}
          </Box>

          <Typography>Semifinales</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              p: 4,
            }}
          >
            {semis.matchesPlayoff.map((partido, index) => (
              <Rounds partido={partido} index={index} />
            ))}
          </Box>

          <Typography>Final</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              p: 4,
            }}
          >
            {final.matchesPlayoff.map((partido, index) => (
              <Rounds partido={partido} index={index} />
            ))}
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default EditPlayoffPage;

export const Rounds = ({ partido, index }: { partido: RoundMatch; index: number }) => {
  const currentMatchSelected = useRef<any | undefined>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const renderMatch = (match: any, isHome: boolean) => {
    const teamName = match
      ? match[isHome ? 'homeTeam' : 'awayTeam']?.name || 'A confirmar'
      : 'A confirmar';
    const teamLogo = match ? match[isHome ? 'homeTeam' : 'awayTeam']?.logo : '';

    return (
      <Grid
        item
        className="flex items-center gap-2"
        style={{ flex: 1, justifyContent: isHome ? 'flex-start' : 'flex-end' }}
      >
        {isHome && (
          <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
            <Image src={teamLogo} className="h-10 w-10 min-w-10 object-contain" />
          </Box>
        )}
        <p
          className="line-clamp-1"
          style={{ whiteSpace: 'nowrap', textAlign: isHome ? 'left' : 'right' }}
        >
          {teamName}
        </p>
        {!isHome && (
          <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
            <Image src={teamLogo} className="h-10 w-10 min-w-10 object-contain" />
          </Box>
        )}
      </Grid>
    );
  };

  if (!!partido.teamWinner) {
    return (
      <>
        <Grid container className="flex items-center gap-2 justify-between" key={index}>
          <Grid item xs={9} className="flex items-center justify-between w-full">
            {renderMatch(partido.homeMatch, true)}
            <Grid
              item
              className="flex items-center justify-center"
              style={{ flexShrink: 0, minWidth: '50px' }}
            >
              <Typography>VS</Typography>
            </Grid>
            {renderMatch(partido.homeMatch, false)}
          </Grid>
        </Grid>
        <Grid container className="flex items-center gap-2 justify-between" key={index}>
          <Grid item xs={9} className="flex items-center justify-between w-full">
            {renderMatch(partido.awayMatch, true)}
            <Grid
              item
              className="flex items-center justify-center"
              style={{ flexShrink: 0, minWidth: '50px' }}
            >
              <Typography>VS</Typography>
            </Grid>
            {renderMatch(partido.awayMatch, false)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ bgcolor: 'gray' }} />
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container className="flex items-center gap-2 justify-between" key={index}>
        <Grid item xs={9} className="flex items-center justify-between w-full">
          {renderMatch(partido.homeMatch, true)}
          <Grid
            item
            className="flex items-center justify-center"
            style={{ flexShrink: 0, minWidth: '50px' }}
          >
            <Typography>VS</Typography>
          </Grid>
          {renderMatch(partido.homeMatch, false)}
        </Grid>
        <Grid item xs={2} className="flex gap-2 justify-end">
          <Button
            variant="contained"
            onClick={() => {
              if (!partido.homeMatch) return;
              currentMatchSelected.current = {
                homeTeam: partido.homeMatch?.homeTeam?.id,
                awayTeam: partido.homeMatch?.awayTeam?.id,
              };
              setEditModalOpen(true);
            }}
          >
            Editar
          </Button>
          <Button variant="contained">Ver</Button>
        </Grid>
      </Grid>
      <Grid container className="flex items-center gap-2 justify-between" key={index}>
        <Grid item xs={9} className="flex items-center justify-between w-full">
          {renderMatch(partido.awayMatch, true)}
          <Grid
            item
            className="flex items-center justify-center"
            style={{ flexShrink: 0, minWidth: '50px' }}
          >
            <Typography>VS</Typography>
          </Grid>
          {renderMatch(partido.awayMatch, false)}
        </Grid>
        <Grid item xs={2} className="flex gap-2 justify-end">
          <Button
            variant="contained"
            onClick={() => {
              if (!partido.awayMatch) return;
              currentMatchSelected.current = {
                homeTeam: partido.awayMatch?.homeTeam?.id,
                awayTeam: partido.awayMatch?.awayTeam?.id,
              };
              setEditModalOpen(true);
            }}
          >
            Editar
          </Button>
          <Button variant="contained">Ver</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ bgcolor: 'gray' }} />
      </Grid>
    </>
  );
};
