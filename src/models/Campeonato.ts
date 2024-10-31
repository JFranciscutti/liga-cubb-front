import { GeneroEnum } from 'src/utils/enums';
import { Categoria } from './Categoria';

export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
  categories?: Categoria[];
  enabled: boolean;
  current: boolean;
}

export enum CampeonatoTypeEnum {
  REGULAR = 'league',
  COPA = 'cup',
}
