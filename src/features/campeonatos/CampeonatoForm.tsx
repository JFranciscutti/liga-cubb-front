import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  HitDatepickerField,
  HitFormActions,
  HitFormSubmitButton,
  HitNumberField,
  HitPasswordField,
  HitSelectField,
  HitTextField,
} from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';

export type CampeonatoFormType = {
  name: string;
  type: string;
  year: string;
  gender?: string;
};

const CampeonatoSchema: Yup.SchemaOf<CampeonatoFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  year: Yup.string().required('Año es requerido'),
  type: Yup.string().required('Tipo es requerido'),
  gender: Yup.string().when('type', {
    is: 'cup',
    then: Yup.string().required('Género es requerido'),
    otherwise: Yup.string().notRequired(),
  }),
});

const defaultValues = {
  name: '',
  type: '',
};

interface CampeonatoFormProps {
  onSubmit: (value: CampeonatoFormType) => Promise<any>;
  initialValues?: CampeonatoFormType;
}

export const CampeonatoForm: React.FC<CampeonatoFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const hf = useForm<CampeonatoFormType>({
    resolver: yupResolver(CampeonatoSchema),
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
        name="year"
        control={hf.control}
        render={(field) => <HitNumberField {...field} label="Año" floatingLabel={false} />}
      />
      <Controller
        name="type"
        control={hf.control}
        render={(field) => (
          <HitSelectField
            {...field}
            label="Tipo"
            options={[
              { label: 'Torneo regular', value: 'league' },
              { label: 'Copa', value: 'cup' },
            ]}
            floatingLabel={false}
          />
        )}
      />

      {hf.watch('type') === 'cup' && (
        <Controller
          name="gender"
          control={hf.control}
          render={(field) => (
            <HitSelectField
              {...field}
              label="Género"
              options={[
                { label: 'Masculina', value: 'male' },
                { label: 'Femenina', value: 'female' },
              ]}
              floatingLabel={false}
            />
          )}
        />
      )}

      <HitFormActions>
        <HitFormSubmitButton>{'Crear'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};
