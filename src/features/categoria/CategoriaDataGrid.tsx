import { IconButton, MenuItem, Typography, capitalize } from '@mui/material';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import {
  HitDataGridFilterResetButton,
  HitDatagrid,
  HitDatagridFilterSubmitButton,
  useColumns,
} from 'src/components/datagrid';
import { HitFormActions, HitFormGrid, HitTextField } from 'src/components/form';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { Categoria } from 'src/models/Categoria';
import { PATHS } from 'src/routes/paths';
import { GeneroEnum } from 'src/utils/enums';

interface Props {
  data: Categoria[];
  isLoading: boolean;
  onDelete: (id: string) => any;
  onEdit: (id: string) => any;
}

type CategoriaFilterType = {
  nombre: string;
};

const defaultValues = {
  nombre: '',
};

export const CategoriaDataGrid: React.FC<Props> = ({ data, isLoading, onDelete, onEdit }) => {
  const params = useParams<any>();
  const hf = useForm<CategoriaFilterType>({
    defaultValues: defaultValues,
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<string | undefined>();

  const columns = useColumns<typeof data[0]>([
    {
      field: 'nombre',
      headerName: 'Nombre',
      type: 'string',
      renderHeader: () => <div className="px-2">{'Nombre'}</div>,
      renderCell: (params) => (
        <div className="w-full px-2">
          <Typography>{params.row.name}</Typography>
        </div>
      ),
    },
    {
      field: 'gender',
      headerName: 'Género',
      type: 'string',
      renderHeader: () => <div className="px-2">{'Género'}</div>,
      renderCell: (params) => {
        const gender = params.row.gender === 'female' ? GeneroEnum.FEMENINO : GeneroEnum.MASCULINO;
        return (
          <div className="w-full px-2">
            <Typography>{capitalize(gender)}</Typography>
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Acciones',
      maxWidth: 200,
      type: 'actions',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              selectedIdRef.current = params.row.id;
              setOpenPopover(e.currentTarget);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </>
      ),
    },
  ]);

  return (
    <Box>
      <HitDatagrid
        filter={{
          hf,
          render: (
            <HitFormGrid>
              <Controller
                name="nombre"
                render={(field) => <HitTextField {...field} label="Nombre" />}
              />

              <HitFormActions>
                <HitDataGridFilterResetButton />
                <HitDatagridFilterSubmitButton />
              </HitFormActions>
            </HitFormGrid>
          ),
        }}
        disableRowSelectionOnClick
        rows={data}
        columns={columns}
      />

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
          selectedIdRef.current = undefined;
        }}
        arrow="right-top"
      >
        <MenuItem
          component={Link}
          to={PATHS.dashboard.campeonatos.manageCategoria(params.id || '', selectedIdRef.current!)}
        >
          <Iconify icon="mdi:eye" />
          Administrar
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenPopover(null);
            onEdit(selectedIdRef.current!);
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Cambiar nombre
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenPopover(null);
            onDelete(selectedIdRef.current!);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Eliminar
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
