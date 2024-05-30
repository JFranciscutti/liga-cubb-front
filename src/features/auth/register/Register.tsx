import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'src/api/AuthRepository';
import { useSnackbar } from 'src/components/snackbar';
import LoginLayout from 'src/layouts/login';
import { PATHS } from 'src/routes/paths';
import AuthWithSocial from '../login/AuthWithSocial';
import AuthRegisterForm, { RegisterFormType } from './AuthRegisterForm';

export default function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (formValues: RegisterFormType) => {
    await registerMutation.mutateAsync(formValues);
    enqueueSnackbar('Register completed!');
    navigate(PATHS.auth.verify);
  };

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link to={PATHS.auth.login} component={RouterLink} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm onSubmit={handleSubmit} />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {' and '}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

      <AuthWithSocial />
    </LoginLayout>
  );
}
