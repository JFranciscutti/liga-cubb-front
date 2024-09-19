import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
} from '@mui/material';

type Match = {
  team1: string;
  team2?: string;
};

interface CreatePlayoffProps {
  equipos: any[];
  handleSave: (fechas: any[]) => void;
}

const CreatePlayoff: React.FC<CreatePlayoffProps> = ({ equipos, handleSave }) => {
  const [matches, setMatches] = useState<Match[]>(
    Array.from({ length: 8 }, () => ({ team1: '', team2: '' }))
  );

  const [selectedTeams, setSelectedTeams] = useState<any[]>([]);

  const handleTeamSelection = (matchIndex: number, teamNumber: 1 | 2, team: string) => {
    const newRounds = [...matches];
    const previousTeam = newRounds[matchIndex][`team${teamNumber}`];

    newRounds[matchIndex][`team${teamNumber}`] = team;
    setMatches(newRounds);

    if (team === '') {
      setSelectedTeams(selectedTeams.filter((t) => t !== previousTeam));
    } else {
      setSelectedTeams([...selectedTeams.filter((t) => t !== previousTeam), team]);
    }
  };

  return (
    <Box className="container mx-auto p-4">
      <Grid container spacing={2}>
        {matches.map((match, matchIndex) => (
          <Grid item xs={12} md={3} style={{ flexWrap: 'wrap' }} key={matchIndex}>
            <Paper className="mb-4 p-4 flex flex-col gap-2 items-center">
              <Typography>Partido {matchIndex + 1}</Typography>
              <FormControl fullWidth className="">
                <InputLabel>Local</InputLabel>
                <Select
                  value={match.team1}
                  onChange={(e: SelectChangeEvent) =>
                    handleTeamSelection(matchIndex, 1, e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Libre</em>
                  </MenuItem>
                  {equipos.map((team) => (
                    <MenuItem
                      key={team.id}
                      value={team.id}
                      disabled={selectedTeams.includes(team.id)}
                    >
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography>VS</Typography>
              <FormControl fullWidth>
                <InputLabel>Visitante</InputLabel>
                <Select
                  value={match.team2}
                  onChange={(e: SelectChangeEvent) =>
                    handleTeamSelection(matchIndex, 2, e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Libre</em>
                  </MenuItem>
                  {equipos.map((team) => (
                    <MenuItem
                      key={team.id}
                      value={team.id}
                      disabled={selectedTeams.includes(team.id)}
                    >
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box className="flex w-full items-end justify-center">
        <Button onClick={() => handleSave(matches)} variant="contained">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePlayoff;
