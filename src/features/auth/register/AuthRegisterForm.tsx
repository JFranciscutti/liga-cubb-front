import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { HitForm, HitFormActions, HitPasswordField, HitTextField } from 'src/components/form';

// auth

// ----------------------------------------------------------------------

export type RegisterFormType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

type Props = {
  onSubmit: (values: RegisterFormType) => Promise<any>;
};

export default function AuthRegisterForm({ onSubmit }: Props) {
  const hf = useForm<RegisterFormType>({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="firstName"
        control={hf.control}
        render={(field) => <HitTextField {...field} label="First name" />}
      />
      <Controller
        name="lastName"
        control={hf.control}
        render={(field) => <HitTextField {...field} label="Last name" />}
      />
      <Controller
        name="email"
        control={hf.control}
        render={(field) => <HitTextField {...field} label="Email address" />}
      />
      <Controller
        name="password"
        control={hf.control}
        render={(field) => <HitPasswordField {...field} label="Password" />}
      />

      <HitFormActions>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={hf.formState.isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Create account
        </LoadingButton>
      </HitFormActions>
    </HitForm>
  );
}
