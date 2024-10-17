import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Campeonato, CAMPEONATOS_MOCK } from 'src/models/Campeonato';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import { Match, playoffFaseMapper, Round, Team } from './CategoriaRepository';
import moment from 'moment';

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

const getTeamMapper = (x: any): Team => ({ ...x });

const faseCopaMapper = (x: any): { matches: Match[]; name: string; teams: Team[] } => ({
  matches: x.matches,
  name: x.name,
  teams: x.teams.map(getTeamMapper),
});

export const partidoMapper = (x: any): Match => ({
  ...x,
  date: !!x?.date ? moment(x?.date) : null,
});

export class CampeonatoRepository {
  keys = {
    all: () => ['campeonatos'],
    one: (id: string) => ['campeonatos', id],
    fases: () => ['fases-copa'],
    oneFase: (idFase: string) => ['fases-copa', idFase],
    partido: (idPartido: string) => [idPartido],
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

  allFases = async (cupId: string) => {
    const { data } = await httpClient.get<any>(`tournament/cup/get-phases?cupId=${cupId}`);
    return data;
  };

  getOneFase = async (faseId: string) => {
    const { data } = await httpClient.get<any[]>(`tournament/cup/get-all-groups?phaseId=${faseId}`);
    return data.map(faseCopaMapper);
  };

  getOnePartido = async ({
    homeTeamId,
    awayTeamId,
    faseId,
  }: {
    homeTeamId: string;
    awayTeamId: string;
    faseId: string;
  }) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/phase-group/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
    //const data = partidoData;
    return partidoMapper(data);
  };

  createFasePlayoff = async ({ partidos, cupId }: { partidos: any[]; cupId: string }) =>
    await httpClient.post(`tournament/cup/create-phase-playoff`, {
      competitionId: cupId,
      round: { roundNumber: partidos.length, matchesPlayoff: partidos },
    });

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<Round[]>(
      `tournament/league/categories/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data.map(playoffFaseMapper);
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

export const useAllFasesByCampeonato = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.fases(), queryFn: () => repo.allFases(id) });

export const useOneFaseCampeonatoQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFase(id),
  });

export const useOnePartidoCopaQuery = (
  localId: string,
  awayId: string,
  faseId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: repo.keys.partido(localId + awayId + faseId),
    queryFn: () => repo.getOnePartido({ homeTeamId: localId, awayTeamId: awayId, faseId: faseId }),
    enabled: enabled,
  });

export const useCreateFasePlayoffCopaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.createFasePlayoff,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.cupId));
    },
  });
};

export const useOneFasePlayoffCopaQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
  });
