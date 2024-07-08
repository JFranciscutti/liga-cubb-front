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

export type NuevoEquipoFormType = {
  name: string;
  image: { file: string | File };
  genero: string;
};

const NuevoEquipoSchema: Yup.SchemaOf<NuevoEquipoFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  image: Yup.mixed().test('is-file-selected', 'La imagen es requerida', function (value) {
    if (!value || !value.file) {
      return this.createError({ message: 'La imagen es requerida' });
    }
    if (fileSizeExceeded(value.file)) {
      return this.createError({ message: 'El tamaño de la imagen es mayor a 2MB' });
    }

    if (
      !testValidExtensionFileIfFileOrURL(
        value.file,
        ['image/jpeg', 'image/jpg', 'image/png'],
        ['jpg', 'jpeg', 'png']
      )
    ) {
      return this.createError({ message: 'Solo se permiten archivos JPG, JPEG y PNG' });
    }
    return true;
  }) as any,
  genero: Yup.string().required('Genero es requerido'),
});

const defaultValues = {
  name: '',
  image: { file: '' },
  genero: '',
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
                    value: GeneroEnum.MASCULINO,
                    label: capitalize(GeneroEnum.MASCULINO),
                  },
                  {
                    value: GeneroEnum.FEMENINO,
                    label: capitalize(GeneroEnum.FEMENINO),
                  },
                ]}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="image"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitImageField {...field} label="Imagen" colSpan={12} floatingLabel={false} />
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
