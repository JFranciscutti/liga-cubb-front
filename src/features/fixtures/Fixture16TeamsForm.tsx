import React from 'react';

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

interface Fixture16TeamsFormProps {
  onSubmit: (value: any) => Promise<any>;
  initialValues?: any;
  edit?: boolean;
}

export const Fixture16TeamsForm: React.FC<Fixture16TeamsFormProps> = ({
  onSubmit,
  initialValues,
  edit = false,
}) => {
  const hf = useForm<any>();

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
