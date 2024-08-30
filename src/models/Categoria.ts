import { GeneroEnum } from 'src/utils/enums';
import { Equipo } from './Equipo';

export interface Categoria {
  id: string;
  name: string;
  gender: GeneroEnum;
}

export interface CategoriaConEquipos extends Categoria {
  teams: Equipo[];
}
