import { Grid, Typography, Box } from '@mui/material';
import Image from 'src/components/image';
import { UseFormReturn } from 'react-hook-form';
import { MatchData } from './EditMatchModal';
import ScoreCounter from './ScoreCounter';

interface TeamDisplayProps {
  teamName: string;
  teamLogo: string;
  isReverse?: boolean;
  hf: UseFormReturn<MatchData, any, undefined>;
  penaltiesEnabled?: boolean;
  teamSide: 'home' | 'away';
}

const TeamDisplay = ({ teamName, teamLogo, isReverse, hf, penaltiesEnabled, teamSide }: TeamDisplayProps) => {
  const homeGoals = hf.watch('homeTeamGoals') || 0;
  const awayGoals = hf.watch('awayTeamGoals') || 0;
  const isMatchTied = homeGoals === awayGoals;
  
  const showPenalties = penaltiesEnabled && isMatchTied;

  return (
    <Grid item xs={5} className={`flex gap-2 items-center justify-between ${isReverse ? 'flex-row-reverse' : ''}`}>
      <Grid item sx={{ maxHeight: 100, maxWidth: 100, objectFit: 'contain', overflow: 'hidden' }}>
        <Image src={teamLogo} />
      </Grid>
      <Typography variant="h6" align="center">
        {teamName}
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        {isReverse && showPenalties && (
          <ScoreCounter
            label="Penales"
            fieldName={`${teamSide}TeamPenaltyGoals`}
            hf={hf}
          />
        )}
        <ScoreCounter
          label="Goles"
          fieldName={`${teamSide}TeamGoals`}
          hf={hf}
        />
        {!isReverse && showPenalties && (
          <ScoreCounter
            label="Penales"
            fieldName={`${teamSide}TeamPenaltyGoals`}
            hf={hf}
          />
        )}
      </Box>
    </Grid>
  );
};

export default TeamDisplay;