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

interface IEditEquipo {
  id: string;
  name: string;
  logo: string;
  gender: string;
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
    oneById: (id: string) => ["one-equipo",id],
    allByCategoria: (id: string) => ['equipos-by-cat', id],
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

  create = (team: ICreateEquipo) =>
    httpClient.post('tournament/league/categories/create-team', team);

  edit = async (category: IEditEquipo) =>
    httpClient.put('teams/' + category.id, { name: category.name });

  remove = async (id: number) => httpClient.delete('teams/' + id);

  getAllByCategoryId = async (id: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-teams-by-id?categoryId=${id}`
    );
    //const data1 = { teams: EQUIPOS_MOCK.map(getEquipoMapper), categoryName: 'A' };
    return data;
  };

  addListOfPlayersToTeam = async ({teamId, players}:{teamId: string, players: string[]}) =>
     httpClient.post('tournament/league/categories/team/add-list-players', players.map(x => ({teamId, membershipNumber: x})));
  
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
    onSuccess: (_,vars) => {
      qc.invalidateQueries(repo.keys.oneById(vars.teamId));
    },
  });
}
