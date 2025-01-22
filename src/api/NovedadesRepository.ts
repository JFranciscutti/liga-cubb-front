import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Novedad } from 'src/models/Novedad';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export interface ICreateNovedad {
  title: string;
  description: string;
  image?: File;
}

interface IEditNovedad extends ICreateNovedad {
  id: string;
}

export const getNovedadMapper = (x: any): Novedad => ({
  id: x.id,
  title: x.title,
  description: x.description,
  image: x.image || '',
  created_at: moment(x.created_at),
  visible: false,
});

export const createNovedadMapper = (x: ICreateNovedad) => x;

export class NovedadesRepository {
  keys = {
    all: () => ['novedades'],
    one: (id: string) => ['novedades', id],
  };

  getAll = async () => {
    //const { data } = await httpClient.get<any[]>('players/get-all-players');
    //    return data.map(getNovedadMapper);
    return MOCK_NOVEDADES;
  };

  get = async (id: string) => {
    //const { data } = await httpClient.get(`teams/${id}`);
    const data = MOCK_NOVEDADES.find((c) => c.id === id);
    return getNovedadMapper(data);
  };

  create = (novedad: ICreateNovedad) => {
    return httpClient.post('news/create-new', novedad, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  edit = async (novedad: IEditNovedad) => {
    return httpClient.put('news/create-new', novedad, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  remove = async (id: string) => {
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    });
    //httpClient.delete('teams/' + id);
  };

  toggleStatus = async (id: string) => {
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    });
    //httpClient.delete('teams/' + id);
  }
}

const repo = new NovedadesRepository();

export const useAllNovedadesQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useNovedadQuery = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useDeleteNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useEditNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};

export const usePublicarNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.toggleStatus,
    onSuccess: (_, id) => {
      qc.invalidateQueries(repo.keys.one(id));
    },
  });
}

const MOCK_NOVEDADES: Novedad[] = [
  {
    id: '1',
    title: 'Novedad 1',
    description: 'Descripción de la novedad 1',
    image: '',
    created_at: moment(),
    visible: false,
  },
  {
    id: '2',
    title: 'Novedad 2',
    description: 'Descripción de la novedad 2',
    image: '',
    created_at: moment(),
    visible: false,
  },
  {
    id: '3',
    title: 'Novedad 3',
    description: 'Descripción de la novedad 3',
    image: '',
    created_at: moment(),
    visible: false,
  },
  {
    id: '4',
    title: 'Novedad 4',
    description: 'Descripción de la novedad 4',
    image: '',
    created_at: moment(),
    visible: false,
  },
  {
    id: '5',
    title: 'Novedad 5',
    description: 'Descripción de la novedad 5',
    image: '',
    created_at: moment(),
    visible: false,
  },
];
