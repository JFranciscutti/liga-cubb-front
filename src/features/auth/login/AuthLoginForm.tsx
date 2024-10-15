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
import { useAuth } from '../BasicContext';
import { useState } from 'react';
// routes

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Usuario es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

const defaultValues = {
  email: '',
  password: '',
};

export default function AuthLoginForm() {
  const [isLogging, setIsLogging] = useState(false);
  const { login } = useAuth();

  const hf = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setIsLogging(true);
      await login(data.email, data.password);
      setIsLogging(false);
    } catch (error) {
      console.error(error);

      hf.reset();

      hf.setError('afterSubmit', {
        ...error,
        message: error.message,
      });

      setIsLogging(false);
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
          render={(props) => <HitTextField {...props} label="Usuario" floatingLabel={false} />}
        />
        <Controller
          name="password"
          render={(props) => (
            <HitPasswordField {...props} label="Contraseña" floatingLabel={false} />
          )}
        />

        <HitFormActions>
          <HitFormSubmitButton
            fullWidth
            loading={isLogging}
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
