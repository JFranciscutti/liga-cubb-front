export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
}

export enum CampeonatoTypeEnum {
  REGULAR = 'league',
  COPA = 'cup',
}

export const CAMPEONATOS_MOCK: Campeonato[] = [
  { id: '1', name: 'Liga 2024', year: '2024', type: CampeonatoTypeEnum.REGULAR },
  { id: '2', name: 'Copa Preparación 2024', year: '2024', type: CampeonatoTypeEnum.COPA },
];
