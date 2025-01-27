import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  HitFormActions,
  HitFormSubmitButton,
  HitPasswordField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';

export type CategoriaFormType = {
  name: string;
  gender: string;
};

const CategoriaSchema: Yup.SchemaOf<CategoriaFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  gender: Yup.string().required('Género es requerido'),
});

const defaultValues = {
  name: '',
  gender: '',
};

interface CategoriaFormProps {
  onSubmit: (value: CategoriaFormType) => Promise<any>;
  initialValues?: CategoriaFormType;
  edit?: boolean;
}

export const CategoriaForm: React.FC<CategoriaFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
}) => {
  const hf = useForm<CategoriaFormType>({
    resolver: yupResolver(CategoriaSchema),
    defaultValues,
    mode: 'onBlur',
    values: initialValues,
  });

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="name"
        control={hf.control}
        render={(field) => <HitTextField {...field} label="Nombre" floatingLabel={false} />}
      />
      <Controller
        name="gender"
        control={hf.control}
        render={(field) => (
          <HitSelectField
            {...field}
            label="Género"
            options={[
              { label: 'Masculino', value: 'male' },
              { label: 'Femenino', value: 'female' },
            ]}
            floatingLabel={false}
          />
        )}
      />

      <HitFormActions>
        <HitFormSubmitButton>{edit ? 'Guardar' : 'Crear'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};
