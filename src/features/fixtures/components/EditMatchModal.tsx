import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogTitle, DialogContent, Grid, Divider } from '@mui/material';
import moment from 'moment';
import { Moment } from 'moment';
import { useForm } from 'react-hook-form';
import { Match, MatchStatus } from 'src/api/CategoriaRepository';
import DialogHeader from 'src/components/DialogHeader';
import { HitForm, HitFormActions, HitFormSubmitButton } from 'src/components/form';
import * as Yup from 'yup';
import canchasData from 'src/mocks/canchas.json';
import TeamStatsForm from './TeamStatsForm';
import MatchResultForm from './MatchResultForm';
import MatchInfoForm from './MatchInfoForm';

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
  homeTeamPenaltyGoals: Yup.number().when(['homeTeamGoals', 'awayTeamGoals', 'penaltiesEnabled'], {
    is: (homeTeamGoals: number, awayTeamGoals: number, penaltiesEnabled: boolean) => 
      homeTeamGoals === awayTeamGoals && penaltiesEnabled,
    then: () => Yup.number().required().min(0),
    otherwise: () => Yup.number().notRequired().nullable(),
  }),
  awayTeamPenaltyGoals: Yup.number().when(['homeTeamGoals', 'awayTeamGoals', 'penaltiesEnabled'], {
    is: (homeTeamGoals: number, awayTeamGoals: number, penaltiesEnabled: boolean) => 
      homeTeamGoals === awayTeamGoals && penaltiesEnabled,
    then: () => Yup.number().required().min(0),
    otherwise: () => Yup.number().notRequired().nullable(),
  }),
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
  homeTeamPenaltyGoals: null,
  awayTeamPenaltyGoals: null,
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

  const homeTeamPlayersSelector: { label: string; value: string }[] =
    match?.homeTeam.players.map(selectorMapper) || [];

  const awayTeamPlayersSelector: { label: string; value: string }[] =
    match?.awayTeam.players.map(selectorMapper) || [];

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
              <MatchResultForm hf={hf} match={match} penaltiesEnabled={penaltiesEnabled} />

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <TeamStatsForm hf={hf} teamPlayersSelector={homeTeamPlayersSelector} team="home" />

              <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Divider orientation="vertical" />
              </Grid>

              <TeamStatsForm hf={hf} teamPlayersSelector={awayTeamPlayersSelector} team="away" />

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray' }} />
              </Grid>

              <MatchInfoForm hf={hf} elegibleTeams={elegibleTeams} />
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
  homeTeamPenaltyGoals: string | null;
  awayTeamPenaltyGoals: string | null;
}
