import { Box, IconButton, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { UseFormReturn } from 'react-hook-form';
import { MatchData } from './EditMatchModal';

interface ScoreCounterProps {
  label: string;
  fieldName: 'homeTeamGoals' | 'awayTeamGoals' | 'homeTeamPenaltyGoals' | 'awayTeamPenaltyGoals';
  hf: UseFormReturn<MatchData, any, undefined>;
}

const ScoreCounter = ({ label, fieldName, hf }: ScoreCounterProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton
        onClick={() => {
          const currentValue = hf.watch(fieldName);
          hf.setValue(fieldName, (parseInt(currentValue || '0') + 1).toString());
        }}
      >
        <Iconify icon="mdi:plus" />
      </IconButton>
      <Box>
        <Typography variant="h6">{hf.watch(fieldName)}</Typography>
      </Box>
      <IconButton
        onClick={() => {
          const currentValue = hf.watch(fieldName);
          hf.setValue(fieldName, Math.max(0, parseInt(currentValue || '0') - 1).toString());
        }}
      >
        <Iconify icon="mdi:minus" />
      </IconButton>
      <Typography variant="caption" color={'text.secondary'}>
        {label}
      </Typography>
    </Box>
  );
};

export default ScoreCounter;