import { Grid, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Match } from 'src/api/CategoriaRepository';
import { MatchData } from './EditMatchModal';
import TeamDisplay from './TeamDisplay';

interface MatchResultFormProps {
  hf: UseFormReturn<MatchData, any, undefined>;
  match: Match;
  penaltiesEnabled?: boolean;
}

const MatchResultForm = ({ hf, match, penaltiesEnabled }: MatchResultFormProps) => {
  return (
    <Grid item xs={12} className="flex justify-between items-center">
      <TeamDisplay
        teamName={match.homeTeam.name}
        teamLogo={match.homeTeam.logo}
        hf={hf}
        penaltiesEnabled={penaltiesEnabled}
        teamSide="home"
      />
      <Grid item xs={1}>
        <Typography variant="h6" align="center">
          VS
        </Typography>
      </Grid>
      <TeamDisplay
        teamName={match.awayTeam.name}
        teamLogo={match.awayTeam.logo}
        isReverse
        hf={hf}
        penaltiesEnabled={penaltiesEnabled}
        teamSide="away"
      />
    </Grid>
  );
};

export default MatchResultForm;
