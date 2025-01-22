import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
  Select,
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import { Moment } from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { Match, MatchStatus } from 'src/api/CategoriaRepository';
import DialogHeader from 'src/components/DialogHeader';
import {
  HitDateTimePickerField,
  HitForm,
  HitFormActions,
  HitFormSubmitButton,
  HitMultiSelectField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import * as Yup from 'yup';
import canchasData from 'src/mocks/canchas.json';

//@ts-ignore
const PartidoSchema: Yup.SchemaOf<MatchData> = Yup.object().shape({
  date: Yup.string().notRequired() as any,
  dateNumber: Yup.number().required(),
  homeTeamId: Yup.string().required(),
  awayTeamId: Yup.string().required(),
  field: Yup.string().notRequired(),
  linemenTeam: Yup.string().notRequired(),
  scorer: Yup.string().notRequired(),
  comments: Yup.string().notRequired(),
  homeTeamGoals: Yup.number().required().min(0),
  awayTeamGoals: Yup.number().required().min(0),
  homeTeamPlayerGoals: Yup.array().of(Yup.string()).notRequired(),
  awayTeamPlayerGoals: Yup.array().of(Yup.string()).notRequired(),
  homeTeamYellowCards: Yup.array().of(Yup.string()).notRequired(),
  awayTeamYellowCards: Yup.array().of(Yup.string()).notRequired(),
  homeTeamRedCards: Yup.array().of(Yup.string()).notRequired(),
  awayTeamRedCards: Yup.array().of(Yup.string()).notRequired(),
  status: Yup.mixed<MatchStatus>().oneOf(Object.values(MatchStatus)).required(),
});

const initialData: MatchData = {
  date: '',
  dateNumber: 0,
  homeTeamId: '', // This would be set from props in a real scenario
  awayTeamId: '', // This would be set from props in a real scenario
  field: '',
  linemenTeamId: '',
  scorerTeamId: '',
  comments: '',
  homeTeamGoals: '0',
  awayTeamGoals: '0',
  homeTeamPlayerGoalsIds: [],
  awayTeamPlayerGoalsIds: [],
  homeTeamYellowCardsIds: [],
  homeTeamRedCardsIds: [],
  awayTeamYellowCardsIds: [],
  awayTeamRedCardsIds: [],
  status: MatchStatus.PENDIENTE,
};

export const selectorMapper = (p: any) => {
  return {
    label: p.name + ' ' + p.lastName,
    value: p.id,
  };
};

interface EditMatchModalProps {
  open: boolean;
  match?: Match;
  handleClose: () => void;
  handleSave: (values: MatchData) => void;
  elegibleTeams: any[];
  isLoading: boolean;
  penaltiesEnabled?: boolean;
}

const EditMatchModal: React.FC<EditMatchModalProps> = ({
  open,
  match,
  elegibleTeams,
  handleClose,
  handleSave,
  isLoading,
  penaltiesEnabled,
}) => {
  const parsedData: MatchData = match
    ? {
        date: moment(match.date).isValid() ? moment(match.date) : '',
        dateNumber: match.dateNumber,
        homeTeamId: match.homeTeam.id,
        awayTeamId: match.awayTeam.id,
        field: match.field || '',
        linemenTeamId: match?.linemenTeam?.id || '',
        scorerTeamId: match?.scorer?.id || '',
        comments: match.comments || '',
        homeTeamGoals: match.homeTeamGoals?.toString() || '0',
        awayTeamGoals: match.awayTeamGoals?.toString() || '0',
        homeTeamPlayerGoalsIds: match.homeTeamPlayerGoals || [],
        awayTeamPlayerGoalsIds: match.awayTeamPlayerGoals || [],
        homeTeamYellowCardsIds: match.homeTeamYellowCards || [],
        awayTeamYellowCardsIds: match.awayTeamYellowCards || [],
        homeTeamRedCardsIds: match.homeTeamRedCards || [],
        awayTeamRedCardsIds: match.awayTeamRedCards || [],
        status: match.status,
        homeTeamPenaltyGoals: match.homeTeamPenaltyGoals?.toString() || '0',
        awayTeamPenaltyGoals: match.awayTeamPenaltyGoals?.toString() || '0',
      }
    : initialData;

  const hf = useForm<MatchData>({
    resolver: yupResolver(PartidoSchema),
    defaultValues: initialData,
    values: parsedData,
    mode: 'onBlur',
  });

  const onSubmit = async (data: MatchData) => {
    // Call handleSave or any other function to save the data
    handleSave(data);
  };

  const homeTeamPlayersSelector = match?.homeTeam.players.map(selectorMapper);

  const awayTeamPlayersSelector = match?.awayTeam.players.map(selectorMapper);

  if (!match) {
    return <></>;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: { width: '100%', maxWidth: '100%' } }}
    >
      <DialogTitle>
        <DialogHeader
          label={`Editar partido ${match.dateNumber === 0 ? '' : `- Fecha ${match.dateNumber}`}`}
          onClick={handleClose}
        />
      </DialogTitle>
      <DialogContent sx={{ width: '100%', height: '100%' }}>
        <Grid container sx={{ py: 5, px: 2 }}>
          <HitForm hf={hf} onSubmit={onSubmit}>
            <Grid container spacing={2} justifyContent={'center'}>
              {/* equipos */}
              <Grid item xs={12} className="flex justify-between items-center">
                <Grid item xs={5} className="flex gap-2 items-center justify-between">
                  <Grid
                    item
                    sx={{ maxHeight: 100, maxWidth: 100, objectFit: 'contain', overflow: 'hidden' }}
                  >
                    <Image src={match.homeTeam.logo} />
                  </Grid>
                  <Typography variant="h6" align="center">
                    {match.homeTeam.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <IconButton
                        onClick={() => {
                          const currentValue = hf.watch('homeTeamGoals');
                          hf.setValue('homeTeamGoals', (parseInt(currentValue) + 1).toString());
                        }}
                      >
                        <Iconify icon="mdi:plus" />
                      </IconButton>
                      <Box>
                        <Typography variant="h6">{hf.watch('homeTeamGoals')}</Typography>
                      </Box>
                      <IconButton
                        onClick={() => {
                          const currentValue = hf.watch('homeTeamGoals');
                          hf.setValue(
                            'homeTeamGoals',
                            Math.max(0, parseInt(currentValue) - 1).toString()
                          );
                        }}
                      >
                        <Iconify icon="mdi:minus" />
                      </IconButton>
                      <Typography variant="caption" color={'text.secondary'}>
                        Goles
                      </Typography>
                    </Box>
                    {penaltiesEnabled && (
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton
                          onClick={() => {
                            const currentValue = hf.watch('homeTeamPenaltyGoals');
                            hf.setValue(
                              'homeTeamPenaltyGoals',
                              (parseInt(currentValue || '0') + 1).toString()
                            );
                          }}
                        >
                          <Iconify icon="mdi:plus" />
                        </IconButton>
                        <Box>
                          <Typography variant="h6">{hf.watch('homeTeamPenaltyGoals')}</Typography>
                        </Box>
                        <IconButton
                          onClick={() => {
                            const currentValue = hf.watch('homeTeamPenaltyGoals');
                            hf.setValue(
                              'homeTeamPenaltyGoals',
                              Math.max(0, parseInt(currentValue || '0') - 1).toString()
                            );
                          }}
                        >
                          <Iconify icon="mdi:minus" />
                        </IconButton>
                        <Typography variant="caption" color={'text.secondary'}>
                          Penales
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="h6" align="center">
                    VS
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  className="flex flex-row-reverse gap-2 items-center justify-between"
                >
                  <Grid
                    item
                    sx={{ maxHeight: 100, maxWidth: 100, objectFit: 'contain', overflow: 'hidden' }}
                  >
                    <Image src={match.awayTeam.logo} />
                  </Grid>
                  <Typography variant="h6" align="center">
                    {match.awayTeam.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    {penaltiesEnabled && (
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton
                          onClick={() => {
                            const currentValue = hf.watch('awayTeamPenaltyGoals');
                            hf.setValue(
                              'awayTeamPenaltyGoals',
                              (parseInt(currentValue || '0') + 1).toString()
                            );
                          }}
                        >
                          <Iconify icon="mdi:plus" />
                        </IconButton>
                        <Box>
                          <Typography variant="h6">{hf.watch('awayTeamPenaltyGoals')}</Typography>
                        </Box>
                        <IconButton
                          onClick={() => {
                            const currentValue = hf.watch('awayTeamPenaltyGoals');
                            hf.setValue(
                              'awayTeamPenaltyGoals',
                              Math.max(0, parseInt(currentValue || '0') - 1).toString()
                            );
                          }}
                        >
                          <Iconify icon="mdi:minus" />
                        </IconButton>
                        <Typography variant="caption" color={'text.secondary'}>
                          Penales
                        </Typography>
                      </Box>
                    )}
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <IconButton
                        onClick={() => {
                          const currentValue = hf.watch('awayTeamGoals');
                          hf.setValue('awayTeamGoals', (parseInt(currentValue) + 1).toString());
                        }}
                      >
                        <Iconify icon="mdi:plus" />
                      </IconButton>
                      <Box>
                        <Typography variant="h6">{hf.watch('awayTeamGoals')}</Typography>
                      </Box>
                      <IconButton
                        onClick={() => {
                          const currentValue = hf.watch('awayTeamGoals');
                          hf.setValue(
                            'awayTeamGoals',
                            Math.max(0, parseInt(currentValue) - 1).toString()
                          );
                        }}
                      >
                        <Iconify icon="mdi:minus" />
                      </IconButton>
                      <Typography variant="caption" color={'text.secondary'}>
                        Goles
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <Grid item sx={{ width: { xs: '48%', md: '49%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1 }}>
                  <Typography color={'text.secondary'}>Goleadores - Local</Typography>
                  {hf.watch('homeTeamPlayerGoalsIds')?.map((id, index) => {
                    const playerData = homeTeamPlayersSelector?.find((p) => p.value === id);
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
                              'homeTeamPlayerGoalsIds',
                              hf.watch('homeTeamPlayerGoalsIds').filter((p, i) => index !== i)
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
                    {homeTeamPlayersSelector?.map((player) => (
                      <MenuItem
                        onClick={() => {
                          hf.setValue('homeTeamPlayerGoalsIds', [
                            ...hf.watch('homeTeamPlayerGoalsIds'),
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
                  name="homeTeamYellowCardsIds"
                  control={hf.control}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas amarillas - Local"
                      floatingLabel={false}
                      options={homeTeamPlayersSelector || []}
                    />
                  )}
                />

                <Controller
                  name="homeTeamRedCardsIds"
                  control={hf.control}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas rojas - Local"
                      floatingLabel={false}
                      options={homeTeamPlayersSelector || []}
                    />
                  )}
                />
              </Grid>
              <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item sx={{ width: { xs: '49%', md: '49%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1 }}>
                  <Typography color={'text.secondary'}>Goleadores - Visitante</Typography>
                  {hf.watch('awayTeamPlayerGoalsIds')?.map((player, index) => {
                    const playerData = awayTeamPlayersSelector?.find((p) => p.value === player);
                    console.log(playerData);

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
                              'awayTeamPlayerGoalsIds',
                              hf.watch('awayTeamPlayerGoalsIds').filter((p, i) => index !== i)
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
                    {awayTeamPlayersSelector?.map((player) => (
                      <MenuItem
                        onClick={() => {
                          hf.setValue('awayTeamPlayerGoalsIds', [
                            ...hf.watch('awayTeamPlayerGoalsIds'),
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
                  name="awayTeamYellowCardsIds"
                  control={hf.control}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas amarillas - Visitante"
                      floatingLabel={false}
                      options={awayTeamPlayersSelector || []}
                    />
                  )}
                />

                <Controller
                  name="awayTeamRedCardsIds"
                  control={hf.control}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas rojas - Visitante"
                      floatingLabel={false}
                      options={awayTeamPlayersSelector || []}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

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
                        label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
                      }))}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <HitFormActions>
              <HitFormSubmitButton>{'Actualizar información'}</HitFormSubmitButton>
            </HitFormActions>
          </HitForm>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatchModal;
export interface MatchData {
  date: Moment | '';
  dateNumber: number;
  field: string | null;
  homeTeamId: string;
  awayTeamId: string;
  linemenTeamId: string | null;
  scorerTeamId: string | null; //planillero
  comments: string | null;
  homeTeamGoals: string;
  awayTeamGoals: string;
  homeTeamPlayerGoalsIds: string[];
  awayTeamPlayerGoalsIds: string[];
  homeTeamYellowCardsIds: string[];
  awayTeamYellowCardsIds: string[];
  homeTeamRedCardsIds: string[];
  awayTeamRedCardsIds: string[];
  status: MatchStatus;
  homeTeamPenaltyGoals?: string;
  awayTeamPenaltyGoals?: string;
}
