import { Grid, Box, Typography, Divider, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Round, RoundMatch } from 'src/api/CategoriaRepository';
import Image from 'src/components/image';
import { LOGO_DEFAULT_TEAM } from 'src/utils/constants';

interface PlayoffRoundsFixtureProps {
  partido: RoundMatch;
  index: number;
}

const PlayoffRoundsFixture: React.FC<PlayoffRoundsFixtureProps> = ({ partido, index }) => {
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ bgcolor: 'gray' }} />
      </Grid>
    </>
  );
};

export default PlayoffRoundsFixture;