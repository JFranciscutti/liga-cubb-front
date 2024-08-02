import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Campeonato, CAMPEONATOS_MOCK } from 'src/models/Campeonato';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateCampeonato {
  name: string;
}

interface IEditCampeonato {
  id: number;
  name: string;
}

export const getCampeonatoMapper = (x: any): Campeonato => x;

export const createCampeonatoMapper = (x: ICreateCampeonato) => x;

export class CampeonatoRepository {
  keys = {
    all: () => ['campeonatos'],
    one: (id: number) => ['campeonatos', id],
  };

  getAll = async () => {
    //const { data } = await httpClient.get<any[]>('campeonatos');
    return CAMPEONATOS_MOCK.map(getCampeonatoMapper);
  };

  get = async (id: number) => {
    //const { data } = await httpClient.get(`campeonatos/${id}`);
    const data = CAMPEONATOS_MOCK.find((c) => c.id === id);
    return getCampeonatoMapper(data);
  };

  create = (category: ICreateCampeonato) => httpClient.post('campeonatos', category);

  edit = async (category: IEditCampeonato) =>
    httpClient.put('campeonatos/' + category.id, { name: category.name });

  remove = async (id: number) => httpClient.delete('campeonatos/' + id);
}

const repo = new CampeonatoRepository();

export const useAllCampeonatosQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCampeonatoQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateCampeonatoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useDeleteCampeonatoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useEditCampeonatoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};
