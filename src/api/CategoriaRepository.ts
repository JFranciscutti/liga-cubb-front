import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fecha } from 'src/hooks/useGenerateEquipos';
import { Categoria } from 'src/models/Categoria';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import { Moment } from 'moment';
import moment from 'moment';
import { Jugador } from 'src/models/Jugador';

interface ICreateCategoria {
  name: string;
  gender: string;
  leagueName: string;
}

interface IEditCategoria {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  gender: string;
  logo: string;
  categoryName: string | null;
  leagueName: string | null;
  players: {
    gender: string;
    name: string;
    lastName: string;
    membershipNumber: string;
    id: string;
  }[];
}

export interface Round {
  matchesPlayoff: RoundMatch[];
  roundNumber: number;
}

export enum MatchStatus {
  PENDING = 'Upcoming',
  PLAYED = 'Played',
  IN_PROGRESS = 'Suspended',
}

export interface Match {
  date: Moment;
  dateNumber: number;
  field: string;
  linemenTeam: string;
  scorer: string;
  comments: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamPlayerGoals: any[];
  awayTeamPlayerGoals: any[];
  homeTeamYellowCards: any[];
  awayTeamYellowCards: any[];
  homeTeamRedCards: any[];
  awayTeamRedCards: any[];
  status: MatchStatus;
}

export interface RoundMatch {
  id: string;
  awayMatch: Match;
  homeMatch: Match;
  teamWinner?: Team | null;
  nextMatchId: string;
}

export const getCategoriaMapper = (x: any): Categoria => x;

export const createCategoriaMapper = (x: ICreateCategoria) => x;

export const faseMapper = (data: any) => {
  return {
    equipoLocal: {
      id: data.homeTeamId,
      name: data.homeTeamName,
      logoUrl: data.homeTeamLogo,
      gender: GeneroEnum.MASCULINO,
    },
    equipoVisitante: {
      id: data.awayTeamId,
      name: data.awayTeamName,
      logoUrl: data.awayTeamLogo,
      gender: GeneroEnum.MASCULINO,
    },
  };
};

export const partidoMapper = (x: any): Match => ({
  ...x,
  date: !!x?.date ? moment(x?.date) : null,
});

export const playoffFaseMapper = (data: any): Round => {
  const matchesPlayoff: RoundMatch[] = data.matchesPlayoff.map((x: any) => ({
    id: x.id,
    awayMatch: partidoMapper(x.awayMatch),
    homeMatch: partidoMapper(x.homeMatch),
    teamWinner: x.teamWinner,
    nextMatchId: x.nextMatchId,
  }));

  return {
    matchesPlayoff: matchesPlayoff,
    roundNumber: data.roundNumber,
  };
};

export class CategoriaRepository {
  keys = {
    all: () => ['categorias'],
    one: (idCat: string) => ['categorias', idCat],
    fases: (idCat: string) => ['fases', idCat],
    oneFase: (idFase: string, fecha?: number) => ['fases', idFase + fecha],
    partido: (idPartido: string) => [idPartido],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('categorias');
    //return CATEGORIAS_MOCK.map(getCategoriaMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`categorias/${id}`);
    //const data = CATEGORIAS_MOCK.find((c) => c.id === id);
    return getCategoriaMapper(data);
  };

  create = (category: ICreateCategoria) =>
    httpClient.post('tournament/league/categories/createCategory', category);

  edit = async (category: IEditCategoria) =>
    httpClient.put('categorias/' + category.id, { name: category.name });

  remove = async (id: string) => httpClient.delete('categorias/' + id);

  saveFecha = async ({ fechas, categoryId }: { fechas: any[]; categoryId: string }) =>
    await httpClient.post(`tournament/league/categories/create-phase-general`, {
      categoryId: categoryId,
      matches: fechas,
    });

  allFases = async (categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-phases?categoryId=${categoryId}`
    );
    return data;
  };

  getOneFase = async (faseId: string, fecha: number) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-all-matches?phaseId=${faseId}&dateNumber=${
        fecha || 1
      }`
    );
    //const data = fechasData;
    return data.map(faseMapper);
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
      `tournament/league/categories/phase-general/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
    //const data = partidoData;
    return partidoMapper(data);
  };

  createFasePlayoff = async ({ partidos, categoryId }: { partidos: any[]; categoryId: string }) =>
    await httpClient.post(`tournament/league/categories/create-phase-playoff`, {
      competitionId: categoryId,
      round: { roundNumber: partidos.length, matchesPlayoff: partidos },
    });

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data.map(playoffFaseMapper);
  };

  editOnePartido = async (partido: any) => await httpClient.post(`tournament/league/categories/phase-general/edit-match`, partido);
  
}

const repo = new CategoriaRepository();

export const useAllCategoriasQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCategoriaQuery = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: repo.keys.all() });
    },
  });
};
export const useDeleteCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: repo.keys.all() });
    },
  });
};
export const useEditCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: repo.keys.one(vars.id) });
    },
  });
};

export const useSaveFaseMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.saveFecha,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: repo.keys.one(vars.categoryId) });
    },
  });
};

export const useAllFasesByCategory = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.fases(id), queryFn: () => repo.allFases(id) });

export const useOneFaseQuery = (id: string, fecha: number) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id, fecha),
    queryFn: () => repo.getOneFase(id, fecha),
  });

export const useOnePartidoQuery = (
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

export const useCreateFasePlayoffMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.createFasePlayoff,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: repo.keys.one(vars.categoryId) });
    },
  });
};

export const useOneFasePlayoffQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
  });
