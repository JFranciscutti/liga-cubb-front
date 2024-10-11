import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Campeonato, CAMPEONATOS_MOCK } from 'src/models/Campeonato';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateCampeonato {
  name: string;
  year: number;
  type: string;
}

interface IEditCampeonato {
  id: string;
  name: string;
}

export const getCampeonatoMapper = (x: any): Campeonato => x;

export const createCampeonatoMapper = (x: ICreateCampeonato) => x;

export class CampeonatoRepository {
  keys = {
    all: () => ['campeonatos'],
    one: (id: string) => ['campeonatos', id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('tournament/all');
    //return CAMPEONATOS_MOCK;
    return data.map(getCampeonatoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`tournament?tournamentId=${id}`);
    //const data = CAMPEONATOS_MOCK.find((c) => c.id === id);
    return data;
  };

  create = (category: ICreateCampeonato) => httpClient.post('tournament', category);

  edit = async (category: IEditCampeonato) =>
    httpClient.put('campeonatos/' + category.id, { name: category.name });

  remove = async (id: string) => httpClient.delete('campeonatos/' + id);

  createFaseGruposCopa = async ({
    campeonatoId,
    grupos,
  }: {
    campeonatoId: string;
    grupos: { groupName: string; matches: any[]; teamsIds: string[] }[];
  }) => {
    await httpClient.post('tournament/cup/create-phase-group', {
      tournamentId: campeonatoId,
      groupTeams: grupos,
    });
  };
}

const repo = new CampeonatoRepository();

export const useAllCampeonatosQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCampeonatoQuery = (id: string) =>
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
      qc.invalidateQueries(repo.keys.one(vars.id.toString()));
    },
  });
};

export const useCreateFaseGruposCopaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.createFaseGruposCopa,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.campeonatoId));
    },
  });
};
