import { GeneroEnum } from 'src/utils/enums';

export interface Equipo {
  id: number;
  nombre: string;
  escudo: string;
  genero: GeneroEnum;
  category_id?: number;
}
