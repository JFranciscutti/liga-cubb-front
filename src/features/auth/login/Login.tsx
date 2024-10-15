// @mui
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import LoginLayout from 'src/layouts/login/LoginLayout';
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Iniciar sesión</Typography>

        <Tooltip title={'Login'} placement="left">
          <Box
            component="img"
            src={`/assets/icons/auth/ic_jwt.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
