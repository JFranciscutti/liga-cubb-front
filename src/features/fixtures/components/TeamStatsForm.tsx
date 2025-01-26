import { Grid, Box, Typography, IconButton, Select, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { HitMultiSelectField } from 'src/components/form';
import Iconify from 'src/components/iconify';
import { MatchData } from './EditMatchModal';

interface TeamStatsFormProps {
  hf: UseFormReturn<MatchData, any, undefined>;
  teamPlayersSelector: { label: string; value: string }[];
  team: 'home' | 'away';
}

const TeamStatsForm = ({ hf, teamPlayersSelector, team }: TeamStatsFormProps) => {
  return (
    <Grid item sx={{ width: { xs: '48%', md: '49%' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1 }}>
        <Typography color={'text.secondary'}>
          Goleadores - {team === 'home' ? 'Local' : 'Visitante'}
        </Typography>
        {hf.watch(`${team}TeamPlayerGoalsIds`)?.map((id: string, index: number) => {
          const playerData = teamPlayersSelector?.find((p) => p.value === id);
          return (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{playerData?.label}</Typography>
              <IconButton
                onClick={() => {
                  hf.setValue(
                    `${team}TeamPlayerGoalsIds`,
                    hf
                      .watch(`${team}TeamPlayerGoalsIds`)
                      .filter((p: string, i: number) => index !== i)
                  );
                }}
              >
                <Iconify icon="zondicons:close-solid" width={24} />
              </IconButton>
            </Box>
          );
        })}
        <Select
          fullWidth
          renderValue={(value) => {
            return <></>;
          }}
        >
          {teamPlayersSelector?.map((player) => (
            <MenuItem
              onClick={() => {
                hf.setValue(`${team}TeamPlayerGoalsIds`, [
                  ...hf.watch(`${team}TeamPlayerGoalsIds`),
                  player.value,
                ]);
              }}
              value={player.value}
            >
              {player.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Controller
        name={`${team}TeamYellowCardsIds`}
        control={hf.control}
        render={(field) => (
          <HitMultiSelectField
            {...field}
            label={`Tarjetas amarillas - ${team === 'home' ? 'Local' : 'Visitante'}`}
            floatingLabel={false}
            options={teamPlayersSelector || []}
          />
        )}
      />

      <Controller
        name={`${team}TeamRedCardsIds`}
        control={hf.control}
        render={(field) => (
          <HitMultiSelectField
            {...field}
            label={`Tarjetas rojas - ${team === 'home' ? 'Local' : 'Visitante'}`}
            floatingLabel={false}
            options={teamPlayersSelector || []}
          />
        )}
      />
    </Grid>
  );
};

export default TeamStatsForm;
