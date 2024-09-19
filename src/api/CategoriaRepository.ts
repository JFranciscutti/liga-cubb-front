import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fecha } from 'src/hooks/useGenerateEquipos';
import { Categoria } from 'src/models/Categoria';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';
import fechasData from 'src/mocks/fechas.json';
import partidoData from 'src/mocks/partido.json';

interface ICreateCategoria {
  name: string;
  gender: string;
  leagueName: string;
}

interface IEditCategoria {
  id: string;
  name: string;
}

export const getCategoriaMapper = (x: any): Categoria => x;

export const createCategoriaMapper = (x: ICreateCategoria) => x;

export const faseMapper = (data: any[]): Fecha[] => {
  const groupedByFecha: { [key: number]: any[] } = {};

  data.forEach((x) => {
    const partido = {
      equipoLocal: {
        id: x.homeTeamId,
        name: x.homeTeamName,
        logoUrl: x.homeTeamLogo,
        gender: GeneroEnum.MASCULINO,
      },
      equipoVisitante: {
        id: x.awayTeamId,
        name: x.awayTeamName,
        logoUrl: x.awayTeamLogo,
        gender: GeneroEnum.MASCULINO,
      },
    };

    // Agrupar los partidos por `dateNumber`
    if (!groupedByFecha[x.dateNumber]) {
      groupedByFecha[x.dateNumber] = [];
    }
    groupedByFecha[x.dateNumber].push(partido);
  });

  // Crear el arreglo final de fechas
  const fechas: Fecha[] = Object.keys(groupedByFecha).map((dateNumber) => ({
    id: Number(dateNumber),
    title: 'Fecha ' + dateNumber,
    partidos: groupedByFecha[Number(dateNumber)],
  }));

  return fechas;
};

export const partidoMapper = (x: any) => x;

export class CategoriaRepository {
  keys = {
    all: () => ['categorias'],
    one: (idCat: string) => ['categorias', idCat],
    fases: (idCat: string) => ['fases', idCat],
    oneFase: (idFase: string) => ['fases', idFase],
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

  getOneFase = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-all-matches?phaseId=${faseId}`
    );
    //const data = fechasData;
    return faseMapper(data);
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
      categoryId: categoryId,
      round: { roundNumber: partidos.length, matchesPlayoff: partidos },
    });

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data;
  };
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

export const useOneFaseQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFase(id),
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
