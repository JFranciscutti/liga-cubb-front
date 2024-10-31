import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Equipo, EQUIPOS_MOCK } from 'src/models/Equipo';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import { getJugadorMapper } from './JugadoresRepository';

interface ICreateEquipo {
  name: string;
  logo: string;
  categoryId: string;
}

interface ICreateEquipoCopa {
  name: string;
  logo: string;
  cupId: string;
}

interface IEditEquipo {
  id: string;
  name: string;
  logo: string;
}

export const getEquipoMapper = (x: any): Equipo => ({
  ...x,
  genero: x.gender === 'male' ? GeneroEnum.MASCULINO : GeneroEnum.FEMENINO,
  jugadores: x.players.map(getJugadorMapper),
});

export const createEquipoMapper = (x: ICreateEquipo) => x;

export class EquipoRepository {
  keys = {
    all: () => ['equipos'],
    oneById: (id: string) => ['one-equipo', id],
    allByCategoria: (id: string) => ['equipos-by-cat', id],
    allByCopa: (id: string) => ['equipos-by-copa', id],
    allByGender: (gender: string) => [`equipos-by-${gender}`],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('teams');
    return data.map(getEquipoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`teams/get-team-by-id?teamId=${id}`);
    //const data = EQUIPOS_MOCK.find((c) => c.id === id);
    return getEquipoMapper(data);
  };

  create = (team: ICreateEquipo) => httpClient.post('teams/create-team', team);

  edit = async (team: IEditEquipo) => httpClient.put('teams/edit-team', team);

  remove = async (id: string) => httpClient.delete(`teams/delete-team?teamId=${id}`);

  getAllByCategoryId = async (id: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-teams-by-id?categoryId=${id}`
    );
    //const data1 = { teams: EQUIPOS_MOCK.map(getEquipoMapper), categoryName: 'A' };
    return data;
  };

  addListOfPlayersToTeam = async ({ teamId, players }: { teamId: string; players: string[] }) =>
    httpClient.post(
      '/teams/add-list-players',
      players.map((x) => ({ teamId, membershipNumber: x }))
    );

  createForCopa = (team: ICreateEquipoCopa) =>
    httpClient.post('tournament/cup/add-teams', team);

  getAllByCopaId = async (id: string) => {
    const { data } = await httpClient.get<any>(`tournament/cup/get-teams-by-id?cupId=${id}`);
    //const data1 = { teams: EQUIPOS_MOCK.map(getEquipoMapper), categoryName: 'A' };
    return data;
  };

  getAllByGender = async (gender: 'male' | 'female') => {
    const { data } = await httpClient.get<any>(`teams/get-teams?gender=${gender}`);
    return data.map((x: any) => ({ name: x.name, logo: x.logo }));
  };
}

const repo = new EquipoRepository();

export const useAllEquiposQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useEquipoQuery = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.oneById(id), queryFn: () => repo.get(id) });

export const useCreateEquipoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};

export const useCreateEquipoCopaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.createForCopa,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.allByCopa(vars.cupId));
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
      qc.invalidateQueries(repo.keys.oneById(vars.id));
    },
  });
};

export const useAllEquiposByCategory = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.allByCategoria(id),
    queryFn: () => repo.getAllByCategoryId(id),
  });

export const useAddListOfPlayersToTeamMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.addListOfPlayersToTeam,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.oneById(vars.teamId));
    },
  });
};

export const useAllEquiposByCopa = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.allByCopa(id),
    queryFn: () => repo.getAllByCopaId(id),
  });

export const useAllTeamsByGender = (gender: 'male' | 'female') =>
  useQuery({
    queryKey: repo.keys.allByGender(gender),
    queryFn: () => repo.getAllByGender(gender),
  });
