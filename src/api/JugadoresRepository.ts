import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Jugador, JUGADORES_MOCK } from 'src/models/Jugador';
import { GeneroEnum } from 'src/utils/enums';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export interface ICreateJugador {
  nombre: string;
  apellido: string;
  nro_socio: string;
  gender: string;
}

interface IEditJugador {
  id: number;
  nombre: string;
  apellido: string;
  nro_socio: string;
  gender: string;
}

export const getJugadorMapper = (x: any): Jugador => ({
  id: x.id,
  nombre: x.nombre,
  apellido: x.apellido,
  nro_socio: x.nro_socio,
  genero: x.gender || GeneroEnum.MASCULINO,
});

export const createJugadorMapper = (x: ICreateJugador) => x;

export class JugadoresRepository {
  keys = {
    all: () => ['jugadores'],
    one: (id: number) => ['jugadores', id],
    allByCategoria: (id: number) => ['jugadores-by-cat'],
  };

  getAll = async () => {
    // const { data } = await httpClient.get<any[]>('teams');
    return JUGADORES_MOCK.map(getJugadorMapper);
  };

  get = async (id: number) => {
    //const { data } = await httpClient.get(`teams/${id}`);
    const data = JUGADORES_MOCK.find((c) => c.id === id);
    return getJugadorMapper(data);
  };

  create = (jugador: ICreateJugador) => {
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    });
    //return httpClient.post('teams', team);
  };

  createList = (jugadores: ICreateJugador[]) => {
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    });
    //return httpClient.post('teams', team);
  };

  edit = async (jugador: IEditJugador) => {
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    });
    // return httpClient.put('teams/' + jugador.id, { name: jugador.nombre });
  };

  remove = async (id: number) => httpClient.delete('teams/' + id);
}

const repo = new JugadoresRepository();

export const useAllJugadoresQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useJugadorQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateJugadorMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useDeleteJugadorMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useEditJugadorMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};