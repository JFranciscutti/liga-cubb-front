import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  HitFormActions,
  HitFormSubmitButton,
  HitImageField,
  HitPasswordField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';
import { fileSizeExceeded } from 'src/utils/fileSizeExceeded';
import { testValidExtensionFileIfFileOrURL } from 'src/utils/testValidExtensionsFileIfFileOrUrl';
import { Grid, capitalize } from '@mui/material';
import { GeneroEnum } from 'src/utils/enums';
import { Categoria } from 'src/models/Categoria';
import { useEffect } from 'react';

export type NuevoJugadorFormType = {
  name: string;
  apellido: string;
  genero: string;
  nro_socio: string;
};

const NuevoJugadorSchema: Yup.SchemaOf<NuevoJugadorFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  apellido: Yup.string().required('Apellido es requerido'),
  nro_socio: Yup.string().required('Nro de Socio es requerido'),
  genero: Yup.string().required('Genero es requerido'),
});

const defaultValues = {
  name: '',
  apellido: '',
  genero: '',
  nro_socio: '',
};

interface NuevoJugadorFormProps {
  onSubmit: (value: NuevoJugadorFormType) => Promise<any>;
  initialValues?: NuevoJugadorFormType;
  edit?: boolean;
}

export const NuevoJugadorForm: React.FC<NuevoJugadorFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
}) => {
  const hf = useForm<NuevoJugadorFormType>({
    resolver: yupResolver(NuevoJugadorSchema),
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
            name="apellido"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => <HitTextField {...field} label="Apellido" floatingLabel={false} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="nro_socio"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitTextField
                {...field}
                label="Número de socio"
                type="number"
                floatingLabel={false}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="genero"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitSelectField
                {...field}
                label="Genero"
                placeholder="Selecciona un genero"
                floatingLabel={false}
                options={[
                  {
                    value: "male",
                    label: capitalize(GeneroEnum.MASCULINO),
                  },
                  {
                    value: "female",
                    label: capitalize(GeneroEnum.FEMENINO),
                  },
                ]}
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
