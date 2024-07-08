import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Equipo } from 'src/models/Equipo';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateEquipo {
  name: string;
  escudo: { file: string | null };
  genero: string;
}

interface IEditEquipo {
  id: number;
  name: string;
  escudo: { file: string | null };
  genero: string;
}

export const getEquipoMapper = (x: any): Equipo => x;

export const createEquipoMapper = (x: ICreateEquipo) => x;

export class EquipoRepository {
  keys = {
    all: () => ['equipos'],
    one: (id: number) => ['equipos', id],
    allByCategoria: (id: number) => ['equipos-by-cat'],
  };

  getAll = async () => {
    //const { data } = await httpClient.get<any[]>('equipos');
    return EQUIPOS_MOCK.map(getEquipoMapper);
  };

  get = async (id: number) => {
    //const { data } = await httpClient.get(`equipos/${id}`);
    const data = EQUIPOS_MOCK.find((c) => c.id === id);
    return getEquipoMapper(data);
  };

  create = (category: ICreateEquipo) => httpClient.post('equipos', category);

  edit = async (category: IEditEquipo) =>
    httpClient.put('equipos/' + category.id, { name: category.name });

  remove = async (id: number) => httpClient.delete('equipos/' + id);

  getByCategoriaId = async (id: number) => {
    //const { data } = await httpClient.get(`equipos/by-category/${id}`);
    const data = EQUIPOS_MOCK.filter((equipo) => {
      if (!!equipo.category_id) {
        return equipo.category_id === id;
      } else {
        return false;
      }
    });
    return data.map(getEquipoMapper);
  };
}

const repo = new EquipoRepository();

export const useAllEquiposQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useEquipoQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateEquipoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useDeleteEquipoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useEditEquipoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};

export const useGetEquiposByCategoria = (id: number) =>
  useSuspenseQuery({
    queryKey: repo.keys.allByCategoria(id),
    queryFn: () => repo.getByCategoriaId(id),
  });

const EQUIPOS_MOCK: Equipo[] = [
  {
    id: 1,
    nombre: 'SIN CONTRATO',
    escudo: 'https://ligacubb.com/imagenes/sincontrato.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 2,
    nombre: 'RITMO Y SUSTANCIA',
    escudo: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 3,
    nombre: 'FUERTE AL MEDIO',
    escudo: 'https://ligacubb.com/imagenes/fuertealmedio.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 4,
    nombre: 'SUPERGEDIENTOS',
    escudo: 'https://ligacubb.com/imagenes/supergedientos.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 5,
    nombre: 'ANTIDEPORTIVO CACACIOLI',
    escudo: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 6,
    nombre: 'LIVERFULL',
    escudo: 'https://ligacubb.com/imagenes/liverfull.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 7,
    nombre: 'REPO P.A.',
    escudo: 'https://ligacubb.com/imagenes/repopa.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 8,
    nombre: 'BAFANGULO',
    escudo: 'https://ligacubb.com/imagenes/bafangulo.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 9,
    nombre: 'THE BIRDS',
    escudo: 'https://ligacubb.com/imagenes/thebirds.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 10,
    nombre: 'ULTRA CUEVA FC',
    escudo: 'https://ligacubb.com/imagenes/ultracuevafc.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 11,
    nombre: 'LA BIGORNIA FC',
    escudo: 'https://ligacubb.com/imagenes/labigorniafc.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 12,
    nombre: 'FONDO BLANCO',
    escudo: 'https://ligacubb.com/imagenes/fondoblanco.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 13,
    nombre: 'MANDIYU´S REVENGE',
    escudo: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 14,
    nombre: 'CUALQUIER FRUTA Y/O VERDURA',
    escudo: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 15,
    nombre: 'INQUI FC',
    escudo: 'https://ligacubb.com/imagenes/inquifc.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 16,
    nombre: 'FERNETBACHE',
    escudo: 'https://ligacubb.com/imagenes/fernetbache.png',
    genero: GeneroEnum.MASCULINO,
    category_id: 1,
  },
  {
    id: 17,
    nombre: 'EL PINCHA',
    escudo: 'https://ligacubb.com/imagenes/fernetbache.png',
    genero: GeneroEnum.MASCULINO,
  },
];
