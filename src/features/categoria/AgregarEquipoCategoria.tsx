import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { HitFormActions, HitFormSubmitButton, HitSelectField } from 'src/components/form';
import { HitForm } from 'src/components/form/HitForm';
import { Equipo } from 'src/models/Equipo';

export type EquipoCategoriaFormType = {
  name: string;
};

const EquipoCategoriaSchema: Yup.SchemaOf<EquipoCategoriaFormType> = Yup.object().shape({
  name: Yup.string().required('Selecciona un equipo'),
});

const defaultValues = {
  name: '',
};

interface EquipoFormProps {
  onSubmit: (value: EquipoCategoriaFormType) => Promise<any>;
  initialValues?: EquipoCategoriaFormType;
  edit?: boolean;
  equipos: Equipo[];
}

export const AgregarEquipoCategoriaForm: React.FC<EquipoFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
  equipos,
}) => {
  const hf = useForm<EquipoCategoriaFormType>({
    resolver: yupResolver(EquipoCategoriaSchema),
    defaultValues,
    mode: 'onBlur',
    values: initialValues,
  });

  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="name"
        control={hf.control}
        rules={{ required: true }}
        render={(field) => (
          <HitSelectField
            {...field}
            label="Equipo"
            floatingLabel={false}
            options={equipos.map((e) => ({ value: e.id.toString(), label: e.name }))}
          />
        )}
      />

      <HitFormActions>
        <HitFormSubmitButton>{'Agregar'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};
