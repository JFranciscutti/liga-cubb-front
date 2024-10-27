import React, { useEffect, useState } from 'react';
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
import { HitForm, HitFormActions, HitFormSubmitButton, HitSelectField } from 'src/components/form';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Match = {
  team1: string;
  team2?: string;
};

interface CreatePlayoffProps {
  equipos: any[];
  handleSave: (fechas: any[]) => void;
}

const selectPhaseSchema: Yup.SchemaOf<{ selectedPhase: number }> = Yup.object().shape({
  selectedPhase: Yup.number().required(),
});

const CreatePlayoff: React.FC<CreatePlayoffProps> = ({ equipos, handleSave }) => {
  const [matches, setMatches] = useState<Match[]>();

  const [selectedTeams, setSelectedTeams] = useState<any[]>([]);

  const handleTeamSelection = (matchIndex: number, teamNumber: 1 | 2, team: string) => {
    if (!matches) return;
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

  const handleSavePhase = (phase: number) => {
    setMatches(Array.from({ length: phase }, () => ({ team1: '', team2: '' })));
  };

  const hf = useForm({
    resolver: yupResolver(selectPhaseSchema),
    defaultValues: {
      selectedPhase: 32,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (matches !== undefined) {
      setMatches(undefined);
    }
    if (hf.watch('selectedPhase') > equipos.length / 2) {
      hf.setError('selectedPhase', {
        type: 'manual',
        message: 'No hay suficientes equipos para esta fase',
      });
    } else {
      hf.clearErrors('selectedPhase');
    }
  }, [hf.watch('selectedPhase')]);

  const handleSubmit = async (values: { selectedPhase: number }) => {
    console.log(values.selectedPhase, equipos.length);

    if (values.selectedPhase > equipos.length / 2) {
      hf.setError('selectedPhase', {
        type: 'manual',
        message: 'No hay suficientes equipos para esta fase',
      });
      return;
    }
    handleSavePhase(values.selectedPhase);
    return Promise.resolve();
  };

  return (
    <Box className="container mx-auto p-4">
      <Box>
        <HitForm hf={hf} onSubmit={handleSubmit}>
          <Controller
            name={`selectedPhase`}
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitSelectField
                {...field}
                label="Selecciona la fase"
                floatingLabel={false}
                options={[
                  { value: 32, label: '32avos de final' },
                  { value: 16, label: '16avos de final' },
                  { value: 8, label: '8vos de final' },
                  { value: 4, label: 'Cuartos de final' },
                  { value: 2, label: 'Semifinal' },
                  { value: 1, label: 'Final' },
                ]}
              />
            )}
          />
          <HitFormActions>
            <HitFormSubmitButton>{'Ir a la creación de cruces'}</HitFormSubmitButton>
          </HitFormActions>
        </HitForm>
      </Box>
      {!!matches && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default CreatePlayoff;
