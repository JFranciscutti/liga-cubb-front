import { forwardRef } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { LOGO } from 'src/config';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ sx, ...other }, ref) => (
  <Box
    ref={ref}
    component="div"
    sx={{
      height: 50,
      display: 'inline-flex',
      ...sx,
    }}
    {...other}
  >
    <img src={LOGO} alt="logo" style={{ objectFit: 'cover' }} />
  </Box>
));

export default Logo;
