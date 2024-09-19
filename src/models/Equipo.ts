import { GeneroEnum } from 'src/utils/enums';

export interface Equipo {
  id: string;
  name: string;
  logoUrl: string;
  gender: GeneroEnum;
}

export const EQUIPOS_MOCK: Equipo[] = [
  {
    id: '1',
    name: 'SIN CONTRATO',
    logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '2',
    name: 'RITMO Y SUSTANCIA',
    logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '3',
    name: 'FUERTE AL MEDIO',
    logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '4',
    name: 'SUPERGEDIENTOS',
    logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '5',
    name: 'ANTIDEPORTIVO CACACIOLI',
    logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '6',
    name: 'LIVERFULL',
    logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '7',
    name: 'REPO P.A.',
    logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '8',
    name: 'BAFANGULO',
    logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '9',
    name: 'THE BIRDS',
    logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '10',
    name: 'ULTRA CUEVA FC',
    logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '11',
    name: 'LA BIGORNIA FC',
    logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '12',
    name: 'FONDO BLANCO',
    logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '13',
    name: 'MANDIYU´S REVENGE',
    logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '14',
    name: 'CUALQUIER FRUTA Y/O VERDURA',
    logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '15',
    name: 'INQUI FC',
    logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
    gender: GeneroEnum.MASCULINO,
  },
  {
    id: '16',
    name: 'FERNETBACHE',
    logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
    gender: GeneroEnum.MASCULINO,
  },
  // {
  //   id: 17,
  //   name: 'EL PINCHA',
  //   logoUrl: 'https://ligacubb.com/imagenes/elpinchafc.png',
  //   gender: GeneroEnum.MASCULINO,
  // },
];
