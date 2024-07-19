import { GeneroEnum } from 'src/utils/enums';

export interface Categoria {
  id: number;
  nombre: string;
  genero: GeneroEnum;
}

export const CATEGORIAS_MOCK: Categoria[] = [
  {
    id: 1,
    nombre: 'A',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: 2,
    nombre: 'B',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: 3,
    nombre: 'C',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: 4,
    nombre: 'D',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: 5,
    nombre: 'E',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: 6,
    nombre: 'A',
    genero: GeneroEnum.FEMENINO,
  },
  {
    id: 7,
    nombre: 'B',
    genero: GeneroEnum.FEMENINO,
  },
  {
    id: 8,
    nombre: 'C',
    genero: GeneroEnum.FEMENINO,
  },
];
