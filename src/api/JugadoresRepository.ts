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
  id: string;
  nombre: string;
  apellido: string;
  nro_socio: string;
  gender: string;
}

export const getJugadorMapper = (x: any): Jugador => ({
  id: x.id,
  nombre: x.name,
  apellido: x.lastName,
  nro_socio: x.membershipNumber,
  genero: x.gender || GeneroEnum.MASCULINO,
});

export const createJugadorMapper = (x: ICreateJugador) => x;

export class JugadoresRepository {
  keys = {
    all: () => ['jugadores'],
    one: (id: string) => ['jugadores', id],
    allByCategoria: (id: string) => ['jugadores-by-cat'],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('players/get-all-players');
    return data.map(getJugadorMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`teams/${id}`);
    //const data = JUGADORES_MOCK.find((c) => c.id === id);
    return getJugadorMapper(data);
  };

  create = (jugador: ICreateJugador) => {
    // return new Promise((res) => {
    //   setTimeout(() => res('OK'), 1000);
    // });
    return httpClient.post('players/create-player', {
      name: jugador.nombre,
      lastName: jugador.apellido,
      membershipNumber: jugador.nro_socio,
      gender: jugador.gender,
    });
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

export const useJugadorQuery = (id: string) =>
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
