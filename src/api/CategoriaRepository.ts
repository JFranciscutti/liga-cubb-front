import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Categoria, CATEGORIAS_MOCK } from 'src/models/Categoria';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateCategoria {
  name: string;
}

interface IEditCategoria {
  id: number;
  name: string;
}

export const getCategoriaMapper = (x: any): Categoria => x;

export const createCategoriaMapper = (x: ICreateCategoria) => x;

export class CategoriaRepository {
  keys = {
    all: () => ['categorias'],
    one: (id: number) => ['categorias', id],
  };

  getAll = async () => {
    //const { data } = await httpClient.get<any[]>('categorias');
    return CATEGORIAS_MOCK.map(getCategoriaMapper);
  };

  get = async (id: number) => {
    //const { data } = await httpClient.get(`categorias/${id}`);
    const data = CATEGORIAS_MOCK.find((c) => c.id === id);
    return getCategoriaMapper(data);
  };

  create = (category: ICreateCategoria) => httpClient.post('categorias', category);

  edit = async (category: IEditCategoria) =>
    httpClient.put('categorias/' + category.id, { name: category.name });

  remove = async (id: number) => httpClient.delete('categorias/' + id);
}

const repo = new CategoriaRepository();

export const useAllCategoriasQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCategoriaQuery = (id: number) =>
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
