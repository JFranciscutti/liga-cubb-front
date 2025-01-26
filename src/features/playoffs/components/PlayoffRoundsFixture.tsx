import { Grid, Box, Typography, Divider, Button } from '@mui/material';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditPartidoCopaPlayoffMutation, useOneFasePlayoffCopaQuery, useOnePartidoCopaPlayoffQuery, useOnePartidoCopaQuery } from 'src/api/CampeonatoRepository';
import { RoundMatch } from 'src/api/CategoriaRepository';
import { useAllEquiposByCopa } from 'src/api/EquipoRepository';
import Image from 'src/components/image';
import EditMatchModal from 'src/features/fixtures/components/EditMatchModal';
import { LOGO_DEFAULT_TEAM } from 'src/utils/constants';

interface PlayoffRoundsFixtureProps {
  partido: RoundMatch;
  index: number;
}

const PlayoffRoundsFixture: React.FC<PlayoffRoundsFixtureProps> = ({ partido, index }) => {
  const { idCampeonato, idFase } = useParams();
  const { data: equipos } = useAllEquiposByCopa(idCampeonato || '');

  const { data } = useOneFasePlayoffCopaQuery(idFase || '');

  const isDoubleMatch = data[0].doubleMatch;

  const currentMatchSelected = useRef<any | undefined>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isAwayMatch, setIsAwayMatch] = useState<boolean>(false);

  const { data: match, isLoading: matchLoading } = useOnePartidoCopaPlayoffQuery(
    currentMatchSelected.current?.homeTeam,
    currentMatchSelected.current?.awayTeam,
    currentMatchSelected.current?.roundId || '',
    currentMatchSelected.current?.phaseId || '',
    !!currentMatchSelected.current
  );

  const editPartidoMutation = useEditPartidoCopaPlayoffMutation();

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
          <Box className="flex items-center justify-center h-12 min-w-12 rounded-full bg-gray-50">
            <Image src={teamLogo || LOGO_DEFAULT_TEAM} className="h-8 w-8 min-w-8 object-contain" />
          </Box>
        )}
        <p
          className="line-clamp-1"
          style={{ whiteSpace: 'nowrap', textAlign: isHome ? 'left' : 'right' }}
        >
          {teamName}
        </p>
        {!isHome && (
          <Box className="flex items-center justify-center h-12 min-w-12 rounded-full bg-gray-50 overfllow-hidden">
            <Image src={teamLogo || LOGO_DEFAULT_TEAM} className="h-8 w-8 min-w-8 object-contain" />
          </Box>
        )}
      </Grid>
    );
  };

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
                homeTeam: partido.homeMatch.homeTeam.id,
                awayTeam: partido.homeMatch.awayTeam.id,
                roundId: partido.id || '',
                phaseId: idFase || '',
              };
              setIsAwayMatch(false);
              setEditModalOpen(true);
            }}
          >
            Editar
          </Button>
        </Grid>
      </Grid>
     {isDoubleMatch && <Grid container className="flex items-center gap-2 justify-between" key={index}>
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
              setIsAwayMatch(true);
              setEditModalOpen(true);
            }}
          >
            Editar
          </Button>
        </Grid>
      </Grid>}
      <Grid item xs={12}>
        <Divider sx={{ bgcolor: 'gray' }} />
      </Grid>
      <EditMatchModal
        open={editModalOpen}
        match={match}
        penaltiesEnabled={isAwayMatch}
        isLoading={matchLoading}
        handleClose={() => {
          setEditModalOpen(false);
          currentMatchSelected.current = undefined;
        }}
        handleSave={async (values) => {
          await editPartidoMutation.mutateAsync({
            ...values,
            date: moment(values.date).isValid() ? moment(values.date).format('YYYY-MM-DDTHH:mm:ss') : null,
            phaseId: idFase || '',
            matchId: currentMatchSelected.current?.roundId,
          });
          enqueueSnackbar('Partido editado correctamente', { variant: 'success' });
          setEditModalOpen(false);
          currentMatchSelected.current = undefined;
        }}
        elegibleTeams={equipos.teams || []}
      />
    </>
  );
};

export default PlayoffRoundsFixture;
