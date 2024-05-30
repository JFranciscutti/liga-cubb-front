import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Box, Grid, Link, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { HitForm } from 'src/components/form/HitForm';
import { HitFormActions, HitFormSubmitButton } from 'src/components/form/HitFormActions';
import { HitPasswordField } from 'src/components/form/HitPasswordField';
import { HitTextField } from 'src/components/form/HitTextField';
import { ENABLED_FEATURES } from 'src/config';
import { PATHS } from 'src/routes/paths';
import { useAuthContext } from '../useAuthContext';
// routes

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email debe ser un correo electrónico válido')
    .required('Email es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

const defaultValues = {
  email: '',
  password: '',
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const hf = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error(error);

      hf.reset();

      hf.setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <Box>
      {!!hf.formState.errors.afterSubmit && (
        <Alert severity="error" sx={{ marginBottom: 4 }}>
          {hf.formState.errors.afterSubmit?.message}
        </Alert>
      )}
      <HitForm hf={hf} onSubmit={onSubmit}>
        <Controller
          name="email"
          render={(props) => <HitTextField {...props} label="Email" floatingLabel={false} />}
        />
        <Controller
          name="password"
          render={(props) => <HitPasswordField {...props} label="Password" floatingLabel={false} />}
        />

        {ENABLED_FEATURES.FORGOT_PASSWORD && (
          <Grid item xs={12}>
            <Stack alignItems="flex-end">
              <Link
                to={PATHS.auth.resetPassword}
                component={RouterLink}
                variant="body2"
                color="inherit"
                underline="always"
              >
                Forgot password?
              </Link>
            </Stack>
          </Grid>
        )}

        <HitFormActions>
          <HitFormSubmitButton
            fullWidth
            size="large"
            sx={{
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Ingresar
          </HitFormSubmitButton>
        </HitFormActions>
      </HitForm>
    </Box>
  );
}
