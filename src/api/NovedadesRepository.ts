import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Novedad } from 'src/models/Novedad';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export interface ICreateNovedad {
  title: string;
  description: string;
  image?: File;
}

interface IEditNovedad extends ICreateNovedad {
  id: string;
}

export const getNovedadMapper = (x: any): Novedad => ({
  id: x.id || '',
  title: x.title,
  description: x.description,
  image: x.imageUrl || '',
  created_at: moment(x.created_at),
  visible: x.enabled,
});

export const createNovedadMapper = (x: ICreateNovedad) => x;

export class NovedadesRepository {
  keys = {
    all: () => ['novedades'],
    one: (id: string) => ['novedades', id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('announcements/get-all-announcements');
    return data.map(getNovedadMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(
      `announcements/get-announcement-by-id?announcementId=${id}`
    );
    return getNovedadMapper(data);
  };

  create = (novedad: ICreateNovedad) =>
    httpClient.post(
      'announcements/create-announcement',
      //@ts-ignore
      { ...novedad, image: novedad.image.file },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

  edit = async (novedad: IEditNovedad) =>
    httpClient.post(
      `announcements/edit-announcement`,
      //@ts-ignore
      { ...novedad, image: novedad.image instanceof Object ? novedad.image.file : undefined },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

  remove = async (id: string) => httpClient.delete('announcements/' + id);

  toggleStatus = async (id: string) =>
    httpClient.post(`announcements/switch-announcement-state-by-id`, {
      announcementId: id,
    });
}

const repo = new NovedadesRepository();

export const useAllNovedadesQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useNovedadQuery = (id: string) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useCreateNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useDeleteNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
export const useEditNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};

export const usePublicarNovedadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.toggleStatus,
    onSuccess: (_, id) => {
      qc.invalidateQueries(repo.keys.one(id));
    },
  });
};
