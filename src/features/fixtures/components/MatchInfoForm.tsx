import { capitalize, Grid } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { MatchStatus, Team } from 'src/api/CategoriaRepository';
import { HitDateTimePickerField, HitSelectField, HitTextField } from 'src/components/form';
import { MatchData } from './EditMatchModal';
import canchasData from 'src/mocks/canchas.json';
import _ from 'lodash';
interface MatchInfoFormProps {
  hf: UseFormReturn<MatchData, any, undefined>;
  elegibleTeams: Team[];
}

const MatchInfoForm = ({ hf, elegibleTeams }: MatchInfoFormProps) => {
  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="date"
          control={hf.control}
          render={(field) => (
            <HitDateTimePickerField
              {...field}
              label="Fecha y hora de inicio"
              floatingLabel={false}
              disablePast
              format="DD/MM/YYYY - HH:mm"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="field"
          control={hf.control}
          render={(field) => (
            <HitSelectField
              {...field}
              label="Cancha"
              floatingLabel={false}
              options={canchasData.canchas || []}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="linemenTeamId"
          control={hf.control}
          render={(field) => (
            <HitSelectField
              {...field}
              label="Equipo linea"
              floatingLabel={false}
              options={
                elegibleTeams.map((team) => ({
                  value: team.id,
                  label: team.name,
                })) || []
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="scorerTeamId"
          control={hf.control}
          render={(field) => (
            <HitSelectField
              {...field}
              label="Equipo planillero"
              floatingLabel={false}
              options={
                elegibleTeams.map((team) => ({
                  value: team.id,
                  label: team.name,
                })) || []
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="comments"
          control={hf.control}
          render={(field) => (
            <HitTextField {...field} label="Comentarios" floatingLabel={false} multiline />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="status"
          control={hf.control}
          render={(field) => (
            <HitSelectField
              {...field}
              label="Estado del partido"
              floatingLabel={false}
              options={Object.entries(MatchStatus).map(([key, value]) => ({
                value: value,
                label: _.capitalize(key),
              }))}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default MatchInfoForm;
