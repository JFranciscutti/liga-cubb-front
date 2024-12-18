// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useAuth } from 'src/features/auth/BasicContext';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { username } = useAuth();

  return (
    <StyledRoot>
      <CustomAvatar src={''} alt={username || ''} name={username || 'User'} />

      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {username || 'User'}
        </Typography>
      </Box>
    </StyledRoot>
  );
}
