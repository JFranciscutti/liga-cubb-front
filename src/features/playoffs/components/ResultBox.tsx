import { Box, Typography, Divider } from '@mui/material';
import { LOGO_DEFAULT_TEAM } from 'src/utils/constants';
import { Team } from './CuadroPlayoff';

interface ResultBoxProps {
  team?: Team;
  resultIda?: number | null;
  resultVuelta?: number | null;
  resultPenales?: number | null;
}

const logo_size = 40;

export const ResultBox: React.FC<ResultBoxProps> = ({
  team,
  resultIda,
  resultPenales,
  resultVuelta,
}) => (
  <Box className="flex gap-2 items-center">
    <img
      src={!!team ? team?.logo : LOGO_DEFAULT_TEAM}
      style={{ height: logo_size, width: logo_size }}
      className={!!team ? 'bg-gray-200 object-contain' : 'bg-black object-contain'}
      alt={''}
    />
    <Typography
      variant="body2"
      className="max-w-24 overflow-hidden text-ellipsis line-clamp-1 w-full font-bold capitalize"
    >
      {team?.name}
    </Typography>
    <Box className="flex items-center">
      <Typography variant="body2" className="absolute right-8">
        {resultIda ?? '-'}
      </Typography>
      <Divider orientation="vertical" flexItem className="bg-white mx-1" />
      <Typography variant="body2" className="absolute right-2">
        {resultVuelta ?? '-'}
      </Typography>
    </Box>
  </Box>
);

export const InvertedResultBox: React.FC<ResultBoxProps> = ({
  team,
  resultIda,
  resultPenales,
  resultVuelta,
}) => (
  <Box className="flex flex-row-reverse gap-2 items-center">
    <img
      src={!!team ? team?.logo : LOGO_DEFAULT_TEAM}
      style={{ height: logo_size, width: logo_size }}
      className={!!team ? 'bg-gray-200 object-contain' : 'bg-black object-contain'}
      alt={''}
    />
    <Typography
      variant="body2"
      className="max-w-24 overflow-hidden text-ellipsis line-clamp-1 w-full"
    >
      {team?.name}
    </Typography>
    <Typography variant="body2" className="absolute left-2">
      {resultIda ?? '-'}
    </Typography>
    <Typography variant="body2" className="absolute left-8">
      {resultVuelta ?? '-'}
    </Typography>
  </Box>
);
