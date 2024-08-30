import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { HitFormActions, HitFormSubmitButton, HitTextField } from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';
import { Grid } from '@mui/material';

export type NuevoEquipoFormType = {
  name: string;
  image: string;
};

const NuevoEquipoSchema: Yup.SchemaOf<NuevoEquipoFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  image: Yup.string().required('Imagen es requerida'),
});

const defaultValues = {
  name: '',
  image: '',
  categoria: 0,
};

interface NuevoEquipoFormProps {
  onSubmit: (value: NuevoEquipoFormType) => Promise<any>;
  initialValues?: NuevoEquipoFormType;
  edit?: boolean;
}

export const NuevoEquipoForm: React.FC<NuevoEquipoFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
}) => {
  const hf = useForm<NuevoEquipoFormType>({
    resolver: yupResolver(NuevoEquipoSchema),
    defaultValues,
    mode: 'onBlur',
    values: initialValues,
  });

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Grid container spacing={2} className="p-5">
        <Grid item xs={12}>
          <Controller
            name="name"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => <HitTextField {...field} label="Nombre" floatingLabel={false} />}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="image"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitTextField {...field} label="URL del logo" floatingLabel={false} />
            )}
          />
        </Grid>
      </Grid>
      <HitFormActions>
        <HitFormSubmitButton>{edit ? 'Guardar' : 'Crear'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};
