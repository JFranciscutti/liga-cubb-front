import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Stack,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DialogHeader from 'src/components/DialogHeader';
import {
  HitDateTimePickerField,
  HitForm,
  HitFormActions,
  HitFormSubmitButton,
  HitMultiSelectField,
  HitNumberField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import * as Yup from 'yup';
import canchasData from 'src/mocks/canchas.json';
import { MatchData } from 'src/features/fixtures/components/EditMatchModal';
import { useOnePartidoCopaQuery } from 'src/api/CampeonatoRepository';
import { useEffect } from 'react';
import { parse } from 'date-fns';
interface EditMatchModalProps {
  open: boolean;
  match: any;
  handleClose: () => void;
  handleSave: (data: MatchData) => void;
}

//@ts-ignore
const PartidoSchema: Yup.SchemaOf<MatchData> = Yup.object().shape({
  date: Yup.string().required(),
  dateNumber: Yup.number().required(),
  homeTeam: Yup.string().required(),
  awayTeam: Yup.string().required(),
  field: Yup.string().required(),
  linemenTeam: Yup.string().required(),
  scorer: Yup.string().required(),
  comments: Yup.string().optional(),
  homeTeamGoals: Yup.number().required().min(0),
  awayTeamGoals: Yup.number().required().min(0),
  homeTeamPlayerGoals: Yup.array().of(Yup.string()).required(),
  awayTeamPlayerGoals: Yup.array().of(Yup.string()).required(),
  homeTeamYellowCards: Yup.array().of(Yup.string()).required(),
  awayTeamYellowCards: Yup.array().of(Yup.string()).required(),
  homeTeamRedCards: Yup.array().of(Yup.string()).required(),
  awayTeamRedCards: Yup.array().of(Yup.string()).required(),
});

const initialData = {
  date: moment(),
  dateNumber: 0,
  homeTeam: '', // This would be set from props in a real scenario
  awayTeam: '', // This would be set from props in a real scenario
  field: '',
  linemenTeam: '',
  scorer: '',
  comments: '',
  homeTeamGoals: '0',
  awayTeamGoals: '0',
  homeTeamPlayerGoals: [{ playerId: '', goals: 0 }],
  awayTeamPlayerGoals: [{ playerId: '', goals: 0 }],
  homeTeamYellowCards: [],
  homeTeamRedCards: [],
  awayTeamYellowCards: [],
  awayTeamRedCards: [],
};

const EditMatchCupModal: React.FC<EditMatchModalProps> = ({
  open,
  match,
  handleClose,
  handleSave,
}) => {
  const { data } = useOnePartidoCopaQuery(
    match?.homeTeam,
    match?.awayTeam,
    match?.phaseId || '',
    !!match?.homeTeam && !!match.awayTeam
  );

  //   const parsedData: MatchData | undefined = data
  //     ? {
  //         date: data.date || moment(),
  //         dateNumber: data.dateNumber,
  //         homeTeam: data.homeTeam.name,
  //         awayTeam: data.awayTeam.name,
  //         field: data.field || '',
  //         linemenTeam: data.linemenTeam || '',
  //         scorer: data.scorer || '',
  //         comments: data.comments || '',
  //         homeTeamGoals: data.homeTeamGoals?.toString() || '0',
  //         awayTeamGoals: data.awayTeamGoals?.toString() || '0',
  //         homeTeamPlayerGoals: data.homeTeamPlayerGoals.map((goal: any) => ({
  //           playerId: goal.playerId,
  //           goals: goal.goals,
  //         })),
  //         awayTeamPlayerGoals: data.awayTeamPlayerGoals.map((goal: any) => ({
  //           playerId: goal.playerId,
  //           goals: goal.goals,
  //         })),
  //         homeTeamYellowCards: data.homeTeamYellowCards,
  //         awayTeamYellowCards: data.awayTeamYellowCards,
  //         homeTeamRedCards: data.homeTeamRedCards,
  //         awayTeamRedCards: data.awayTeamRedCards,
  //       }
  //     : undefined;

  //   console.log(parsedData);

  const hf = useForm<MatchData>({
    resolver: yupResolver(PartidoSchema),
    defaultValues: initialData,
    values: initialData,
    mode: 'onBlur',
  });

  const homeTeamPlayerGoalsHelper = useFieldArray({
    control: hf.control,
    name: 'homeTeamPlayerGoals',
  });

  const awayTeamPlayerGoalsHelper = useFieldArray({
    control: hf.control,
    name: 'awayTeamPlayerGoals',
  });

  const onSubmit = async (data: MatchData) => {
    handleSave(data);
  };

  if (!data) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '100%' } }}>
      <DialogTitle>
        <DialogHeader label={`Editar partido - Fecha ${data.dateNumber}`} onClick={handleClose} />
      </DialogTitle>
      <DialogContent sx={{ width: '100%', height: '100%' }}>
        <Grid container sx={{ py: 5, px: 2 }}>
          <HitForm hf={hf} onSubmit={onSubmit}>
            <Grid container spacing={2} justifyContent={'center'}>
              {/* equipos */}
              <Grid item xs={12} className="flex justify-between">
                <Grid item xs={4} className="flex gap-2">
                  <Grid item>
                    <Image src={data.homeTeam.logo} />
                  </Grid>
                  <Typography variant="h6" align="center">
                    {data.homeTeam.name}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="h6" align="center">
                    VS
                  </Typography>
                </Grid>
                <Grid item xs={4} className="flex flex-row-reverse gap-2">
                  <Grid item>
                    <Image src={data.awayTeam.logo} />
                  </Grid>
                  <Typography variant="h6" align="center">
                    {data.awayTeam.name}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <Grid item xs={12} className="flex flex-col gap-5">
                <Box className="flex w-full justify-center">
                  <Typography className="font-bold">Goles local</Typography>
                </Box>
                {homeTeamPlayerGoalsHelper.fields.map((field, index) => (
                  <Stack key={field.id} spacing={2} direction="row">
                    <Controller
                      name={`homeTeamPlayerGoals.${index}.playerId`}
                      control={hf.control}
                      rules={{ required: true }}
                      render={(field) => (
                        <HitSelectField
                          {...field}
                          label="Jugador"
                          floatingLabel={false}
                          options={
                            data.homeTeam.players.map((p: any) => ({
                              value: p.membershipNumber,
                              label: p.name + ' ' + p.lastName,
                            })) || []
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`homeTeamPlayerGoals.${index}.goals`}
                      control={hf.control}
                      rules={{ required: true }}
                      render={(field) => (
                        <HitNumberField {...field} label="Goles" floatingLabel={false} />
                      )}
                    />
                    <Stack alignSelf={'flex-end'}>
                      <IconButton
                        disabled={homeTeamPlayerGoalsHelper.fields.length === 1}
                        onClick={() => homeTeamPlayerGoalsHelper.remove(index)}
                      >
                        <Iconify style={{ width: 22, height: 22 }} icon={'ic:outline-delete'} />
                      </IconButton>

                      <Box className="flex justify-end w-full">
                        <IconButton
                          onClick={() =>
                            homeTeamPlayerGoalsHelper.append({ playerId: '', goals: 0 })
                          }
                        >
                          <Iconify
                            style={{ width: 22, height: 22 }}
                            icon={'material-symbols:add-box-outline-rounded'}
                          />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <Grid item xs={12} className="flex flex-col gap-5">
                <Box className="flex w-full justify-center">
                  <Typography className="font-bold">Goles visitante</Typography>
                </Box>
                {awayTeamPlayerGoalsHelper.fields.map((field, index) => (
                  <Stack key={field.id} spacing={2} direction="row">
                    <Controller
                      name={`awayTeamPlayerGoals.${index}.playerId`}
                      control={hf.control}
                      rules={{ required: true }}
                      render={(field) => (
                        <HitSelectField
                          {...field}
                          label="Jugador"
                          floatingLabel={false}
                          options={
                            data.awayTeam.players.map((p: any) => ({
                              value: p.membershipNumber,
                              label: p.name + ' ' + p.lastName,
                            })) || []
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`awayTeamPlayerGoals.${index}.goals`}
                      control={hf.control}
                      rules={{ required: true }}
                      render={(field) => (
                        <HitNumberField {...field} label="Goles" floatingLabel={false} />
                      )}
                    />
                    <Stack alignSelf={'flex-end'}>
                      <IconButton
                        disabled={awayTeamPlayerGoalsHelper.fields.length === 1}
                        onClick={() => awayTeamPlayerGoalsHelper.remove(index)}
                      >
                        <Iconify style={{ width: 22, height: 22 }} icon={'ic:outline-delete'} />
                      </IconButton>

                      <Box className="flex justify-end w-full">
                        <IconButton
                          onClick={() =>
                            awayTeamPlayerGoalsHelper.append({ playerId: '', goals: 0 })
                          }
                        >
                          <Iconify
                            style={{ width: 22, height: 22 }}
                            icon={'material-symbols:add-box-outline-rounded'}
                          />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="homeTeamYellowCards"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas amarillas - Local"
                      floatingLabel={false}
                      options={[]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="awayTeamYellowCards"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas amarillas - Visitante"
                      floatingLabel={false}
                      options={[]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="homeTeamRedCards"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas rojas - Local"
                      floatingLabel={false}
                      options={[]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="awayTeamRedCards"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitMultiSelectField
                      {...field}
                      label="Tarjetas rojas - Visitante"
                      floatingLabel={false}
                      options={[]}
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
                  rules={{ required: true }}
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
                  rules={{ required: true }}
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
                  name="linemenTeam"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitSelectField
                      {...field}
                      label="Equipo linea"
                      floatingLabel={false}
                      options={[
                        { value: 'ajsdjas', label: 'ajsdjas' },
                        { value: 'jajdsfjas', label: 'jajdsfjas' },
                      ]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="scorer"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitSelectField
                      {...field}
                      label="Equipo planillero"
                      floatingLabel={false}
                      options={[
                        { value: 'ajsdjas', label: 'ajsdjas' },
                        { value: 'jajdsfjas', label: 'jajdsfjas' },
                      ]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="comments"
                  control={hf.control}
                  rules={{ required: true }}
                  render={(field) => (
                    <HitTextField {...field} label="Comentarios" floatingLabel={false} multiline />
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

export default EditMatchCupModal;