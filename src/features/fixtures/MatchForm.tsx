import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, Stack, Typography } from '@mui/material';
import { HitForm, HitSelectField } from 'src/components/form';
import { Equipo } from 'src/models/Equipo';

const schema = yup.object().shape({
  matches: yup
    .array()
    .of(
      yup.object().shape({
        team1: yup.string().required('Team 1 is required'),
        team2: yup
          .string()
          .required('Team 2 is required')
          .notOneOf([yup.ref('team1')], 'Teams must be different'),
      })
    )
    .test('unique-teams', 'Teams must be unique', (value) => {
      const teamsSet = new Set();
      if (value) {
        for (const match of value) {
          teamsSet.add(match.team1);
          teamsSet.add(match.team2);
        }
        return teamsSet.size === 16;
      }
      return false;
    }),
});

type Match = {
  team1: string;
  team2: string;
};

type FormValues = {
  matches: Match[];
};

interface MatchFormProps {
  equipos: Equipo[];
}

const MatchForm: React.FC<MatchFormProps> = ({ equipos }) => {
  const hf = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      matches: Array(8).fill({ team1: '', team2: '' }),
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Grid container>
        <Grid item xs={12} alignItems={'center'} justifyContent={'center'} paddingBottom={5}>
          <Typography align="center">Fecha 1</Typography>
        </Grid>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid
            container
            xs={12}
            key={index}
            direction={'row'}
            spacing={2}
            justifyContent={'center'}
          >
            <Grid item xs={5}>
              <Controller
                name={`matches.${index}.team1`}
                control={hf.control}
                render={(field) => (
                  <HitSelectField
                    {...field}
                    label={'Local'}
                    options={equipos.map((e) => ({ label: e.nombre, value: e.id }))}
                    floatingLabel={false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Controller
                name={`matches.${index}.team2`}
                control={hf.control}
                render={(field) => (
                  <HitSelectField
                    {...field}
                    label={'Visitante'}
                    options={[]}
                    floatingLabel={false}
                  />
                )}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </HitForm>
  );
};

export default MatchForm;
