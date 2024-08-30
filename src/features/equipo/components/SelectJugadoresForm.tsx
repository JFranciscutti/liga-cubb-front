import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
  HitForm,
  HitTextField,
  HitFormActions,
  HitFormSubmitButton,
  HitMultiAutocompleteField,
} from 'src/components/form';
import { Jugador } from 'src/models/Jugador';
import * as Yup from 'yup';

export type CargarJugadorFormType = {
  ids: string[];
};

const CargarJugadorSchema: Yup.SchemaOf<CargarJugadorFormType> = Yup.object().shape({
  ids: Yup.array()
    .required('Seleccione al menos un jugador')
    .min(1, 'Seleccione al menos un jugador'),
});

const defaultValues = {
  ids: [],
};

interface CargarJugadorFormProps {
  onSubmit: (value: CargarJugadorFormType) => Promise<any>;
  jugadores: Jugador[];
}

const SelectJugadoresForm: React.FC<CargarJugadorFormProps> = ({ onSubmit, jugadores }) => {
  const hf = useForm<CargarJugadorFormType>({
    resolver: yupResolver(CargarJugadorSchema),
    defaultValues,
    mode: 'onBlur',
  });
  return (
    <HitForm hf={hf} onSubmit={onSubmit}>
      <Grid container spacing={2} className="p-5">
        <Grid item xs={12}>
          <Controller
            name="ids"
            control={hf.control}
            rules={{ required: true }}
            render={(field) => (
              <HitMultiAutocompleteField
                {...field}
                options={jugadores.map((jugador) => ({
                  label: jugador.nombre + ' ' + jugador.apellido,
                  value: jugador.nro_socio,
                }))}
                label="Jugadores disponibles"
                floatingLabel={false}
              />
            )}
          />
        </Grid>
      </Grid>
      <HitFormActions>
        <HitFormSubmitButton>{'Cargar'}</HitFormSubmitButton>
      </HitFormActions>
    </HitForm>
  );
};

export default SelectJugadoresForm;
