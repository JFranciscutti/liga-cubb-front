import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  HitFormActions,
  HitFormSubmitButton,
  HitPasswordField,
  HitTextField,
} from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';

export type CategoriaFormType = {
  name: string;
};

const CategoriaSchema: Yup.SchemaOf<CategoriaFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
});

const defaultValues = {
  name: '',
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

      <HitFormActions>
        <HitFormSubmitButton>{edit ? 'Guardar' : 'Crear'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};
