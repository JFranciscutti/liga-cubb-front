import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Equipo, EQUIPOS_MOCK } from 'src/models/Equipo';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateEquipo {
  name: string;
  logo: string;
  gender: string;
}

interface IEditEquipo {
  id: number;
  name: string;
  logo: string;
  gender: string;
}

export const getEquipoMapper = (x: any): Equipo => ({
  id: x.id,
  nombre: x.name,
  escudo: x.logoUrl,
  genero: x.gender || GeneroEnum.MASCULINO,
});

export const createEquipoMapper = (x: ICreateEquipo) => x;

export class EquipoRepository {
  keys = {
    all: () => ['equipos'],
    one: (id: number) => ['equipos', id],
    allByCategoria: (id: number) => ['equipos-by-cat'],
  };

  getAll = async () => {
    // const { data } = await httpClient.get<any[]>('teams');
    return EQUIPOS_MOCK.map(getEquipoMapper);
  };

  get = async (id: number) => {
    //const { data } = await httpClient.get(`teams/${id}`);
    const data = EQUIPOS_MOCK.find((c) => c.id === id);
    return getEquipoMapper(data);
  };

  create = (team: ICreateEquipo) => httpClient.post('teams', team);

  edit = async (category: IEditEquipo) =>
    httpClient.put('teams/' + category.id, { name: category.name });

  remove = async (id: number) => httpClient.delete('teams/' + id);
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