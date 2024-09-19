import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
  Grid,
} from '@mui/material';
import moment from 'moment';
import { Moment } from 'moment';
import { Match } from 'msw';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useOnePartidoQuery } from 'src/api/CategoriaRepository';
import DialogHeader from 'src/components/DialogHeader';
import {
  HitDateTimePickerField,
  HitForm,
  HitFormActions,
  HitFormSubmitButton,
  HitNumberField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import Image from 'src/components/image';
import * as Yup from 'yup';

interface EditMatchModalProps {
  open: boolean;
  match: any;
  handleClose: () => void;
  handleSave: () => void;
}

const PartidoSchema: Yup.SchemaOf<MatchData> = Yup.object().shape({
  date: Yup.string().required(),
  dateNumber: Yup.number().required(),
  homeTeam: Yup.string().required(),
  awayTeam: Yup.string().required(),
  field: Yup.string().required(),
  linemenTeam: Yup.string().required(),
  scorer: Yup.string().required(),
  comments: Yup.string().optional(),
  homeTeamGoals: Yup.number().required(),
  awayTeamGoals: Yup.number().required(),
  homeTeamPlayerGoals: Yup.array().of(Yup.string()).required(),
  awayTeamPlayerGoals: Yup.array().of(Yup.string()).required(),
  homeTeamYellowCards: Yup.array().of(Yup.string()).required(),
  awayTeamYellowCards: Yup.array().of(Yup.string()).required(),
  homeTeamRedCards: Yup.array().of(Yup.string()).required(),
  awayTeamRedCards: Yup.array().of(Yup.string()).required(),
});

const EditMatchModal: React.FC<EditMatchModalProps> = ({
  open,
  match,
  handleClose,
  handleSave,
}) => {
  const params = useParams<{ id: string }>();
  const { data: dataPartido } = useOnePartidoQuery(
    match?.homeTeam,
    match?.awayTeam,
    params.id || '',
    !!match?.homeTeam && !!match.awayTeam
  );

  const hf = useForm<MatchData>({
    resolver: yupResolver(PartidoSchema),
    defaultValues: {
      date: moment().toISOString(),
      dateNumber: 0,
      homeTeam: '', // This would be set from props in a real scenario
      awayTeam: '', // This would be set from props in a real scenario
      field: '',
      linemenTeam: '',
      scorer: '',
      comments: '',
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      homeTeamPlayerGoals: [],
      awayTeamPlayerGoals: [],
      homeTeamYellowCards: [],
      homeTeamRedCards: [],
      awayTeamYellowCards: [],
      awayTeamRedCards: [],
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: MatchData) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '100%' } }}>
      <DialogTitle>
        <DialogHeader label="Editar partido" onClick={handleClose} />
      </DialogTitle>
      <DialogContent sx={{ mb: 4, width: '100%' }}>
        {/* {!!dataPartido && (
          <>
            <Typography>{`Fecha ${dataPartido?.dateNumber || 0}`}</Typography>
            {Object.entries(dataPartido).map((campo) => (
              <Typography>{`${campo[0] + ': ' + JSON.stringify(campo[1])}`}</Typography>
            ))}
          </>
        )} */}
        <Grid container>
          <Grid item xs={12} className="flex items-center justify-between w-full h-20">
            {/* Contenedor del equipo local */}
            <Grid item className="flex items-center gap-2" style={{ flex: 1 }}>
              <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                <Image src={data.homeTeam.logo} className="h-10 w-10 min-w-10" />
              </Box>
              <p className="line-clamp-1" style={{ whiteSpace: 'nowrap' }}>
                {data.homeTeam.name}
              </p>
            </Grid>

            {/* Contenedor del "VS" */}
            <Grid
              item
              className="flex items-center justify-center"
              style={{ flexShrink: 0, minWidth: '50px' }}
            >
              <Typography>VS</Typography>
            </Grid>

            {/* Contenedor del equipo visitante */}
            <Grid
              item
              className="flex items-center gap-2"
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <p className="line-clamp-1" style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                {data.awayTeam.name}
              </p>
              <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                <Image src={data.awayTeam.logo} className="h-10 w-10 min-w-10" />
              </Box>
            </Grid>
          </Grid>
          <HitForm hf={hf} onSubmit={onSubmit}>
            <Grid container spacing={2} className="p-5">
              <Controller
                name="date"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitDateTimePickerField {...field} label="Fecha" floatingLabel={false} />
                )}
              />
              <Controller
                name="dateNumber"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitNumberField {...field} label="Número de Fecha" floatingLabel={false} />
                )}
              />
              <Controller
                name="field"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitTextField {...field} label="Campo" floatingLabel={false} />
                )}
              />
              <Controller
                name="linemenTeam"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitTextField {...field} label="Equipo de Líneas" floatingLabel={false} />
                )}
              />
              <Controller
                name="scorer"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitTextField {...field} label="Anotador" floatingLabel={false} />
                )}
              />
              <Controller
                name="comments"
                control={hf.control}
                render={({ field }) => (
                  <HitTextField {...field} label="Comentarios" floatingLabel={false} />
                )}
              />
              <Controller
                name="homeTeamGoals"
                control={hf.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HitNumberField {...field} label="Goles del Equipo Local" floatingLabel={false} />
                )}
              />
              <Controller
                name="awayTeamGoals"
                control={hf.control}
                rules={{ required: true }}
                render={(field) => (
                  <HitNumberField
                    {...field}
                    label="Goles del equipo visitante"
                    floatingLabel={false}
                  />
                )}
              />
            </Grid>
            <HitFormActions>
              <HitFormSubmitButton>{'Guardar'}</HitFormSubmitButton>
            </HitFormActions>
          </HitForm>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatchModal;

const data = {
  date: null,
  dateNumber: 1,
  field: null,
  linemenTeam: null,
  scorer: null,
  comments: null,
  homeTeam: {
    id: '66d0f984684a731c7781781c',
    name: 'la masturbandeja',
    gender: 'male',
    logo: 'logodepruebarda.com',
    categoryName: null,
    leagueName: null,
  },
  awayTeam: {
    id: '66d0fc30f406d04e37770982',
    name: 'el rojo los putos del rojo',
    gender: 'male',
    logo: 'todorojo.com',
    categoryName: null,
    leagueName: null,
  },
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  homeTeamPlayerGoals: [],
  awayTeamPlayerGoals: [],
  homeTeamYellowCards: [],
  awayTeamYellowCards: [],
  homeTeamRedCards: [],
  awayTeamRedCards: [],
};

export interface MatchData {
  date: string;
  dateNumber: number;
  field: string;
  homeTeam: string;
  awayTeam: string;
  linemenTeam: string;
  scorer: string; //planillero
  comments: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamPlayerGoals: string[];
  awayTeamPlayerGoals: string[];
  homeTeamYellowCards: string[];
  awayTeamYellowCards: string[];
  homeTeamRedCards: string[];
  awayTeamRedCards: string[];
}
