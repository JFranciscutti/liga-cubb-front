import { Button, Container } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Match, MatchStatus } from 'src/api/CategoriaRepository';
import EditMatchModal, { MatchData } from 'src/features/fixtures/components/EditMatchModal';

const TestPage = () => {
  const [open, setOpen] = useState(false);

  const handleSave = (values: MatchData) => {
    console.log(values);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Test</h1>
        <Button onClick={() => setOpen(true)}>Test</Button>
      </Container>

      <EditMatchModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSave={handleSave}
        elegibleTeams={[]}
        isLoading={false}
        penaltiesEnabled
        match={testMatch}
      />
    </>
  );
};

export default TestPage;

const testMatch: Match = {
  date: moment('2024-01-01'),
  dateNumber: 1,
  field: 'test',
  linemenTeam: {
    id: '1',
    name: 'test',
    gender: 'M',
    logo: 'test',
    categoryName: 'test',
    leagueName: 'test',
    players: [],
  },
  scorer: {
    id: '1',
    name: 'test',
    gender: 'M',
    logo: 'test',
    categoryName: 'test',
    leagueName: 'test',
    players: [],
  },
  comments: 'test',
  homeTeam: {
    id: '1',
    name: 'test',
    gender: 'M',
    logo: 'test',
    categoryName: 'test',
    leagueName: 'test',
    players: [],
  },
  awayTeam: {
    id: '1',
    name: 'test',
    gender: 'M',
    logo: 'test',
    categoryName: 'test',
    leagueName: 'test',
    players: [],
  },
  homeTeamGoals: 1,
  awayTeamGoals: 1,
  homeTeamPlayerGoals: ['1'],
  awayTeamPlayerGoals: ['1'],
  homeTeamYellowCards: ['1'],
  awayTeamYellowCards: ['1'],
  homeTeamRedCards: ['1'],
  awayTeamRedCards: ['1'],
  status: MatchStatus.PENDIENTE,
  homeTeamPenaltyGoals: 1,
  awayTeamPenaltyGoals: 1,
};
