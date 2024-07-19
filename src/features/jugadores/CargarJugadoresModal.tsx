import { CSVImporter } from 'csv-import-react';

interface CargarJugadoresModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export const CargarJugadoresModal: React.FC<CargarJugadoresModalProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  return (
    <CSVImporter
      modalIsOpen={open}
      modalOnCloseTriggered={onClose}
      darkMode={true}
      onComplete={onComplete}
      template={{
        columns: [
          {
            name: 'Nombre',
            key: 'nombre',
            required: true,
            description: 'Nombre del jugador',
          },
          {
            name: 'Apellido',
            key: 'apellido',
            required: true,
            description: 'Apellido del jugador',
          },
          {
            name: 'Numero de socio',
            key: 'nro_socio',
            required: true,
            description: 'Numero de Socio',
          },
          {
            name: 'Género',
            key: 'genero',
            required: true,
            description: 'Género',
          },
        ],
      }}
    />
  );
};
