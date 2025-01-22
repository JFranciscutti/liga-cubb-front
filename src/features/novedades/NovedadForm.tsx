import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  HitFormActions,
  HitFormSubmitButton,
  HitImageField,
  HitTextField,
} from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';
import { Grid } from '@mui/material';
import { useState } from 'react';

export type NovedadFormType = {
  title: string;
  description: string;
  image: File | '' | string;
};

const NovedadSchema: Yup.SchemaOf<NovedadFormType> = Yup.object().shape({
  title: Yup.string().required('El título es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  image: Yup.mixed<File | ''>().defined(),
});

const defaultValues: NovedadFormType = {
  title: '',
  description: '',
  image: '',
};

interface NovedadFormProps {
  onSubmit: (value: NovedadFormType) => Promise<any>;
  initialValues?: NovedadFormType;
  edit?: boolean;
}

export const NovedadForm: React.FC<NovedadFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
}) => {
  const hf = useForm<NovedadFormType>({
    resolver: yupResolver(NovedadSchema),
    defaultValues,
    mode: 'onBlur',
    values: initialValues,
  });

  console.log(hf.getValues());
  

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Grid container spacing={2} className="p-5">
        <Grid item xs={12}>
          <Controller
            name="title"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => <HitTextField {...field} label="Titulo" floatingLabel={false} placeholder='Escribí acá el titulo de la novedad...'/>}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="description"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitTextField {...field} label="Descripción" floatingLabel={false} multiline placeholder='Escribí acá el desarrollo de la novedad...'/>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="image"
            control={hf.control}
            rules={{ required: true }}
            render={({ field, formState, fieldState }) => (
              <HitImageField
                field={{
                  ...field,
                  value: { file: field.value },
                }}
                formState={formState}
                fieldState={fieldState}
                label="Imagen"
                floatingLabel={false}
              />
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
