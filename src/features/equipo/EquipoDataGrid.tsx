import { IconButton, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  HitDataGridFilterResetButton,
  HitDatagrid,
  HitDatagridFilterSubmitButton,
  useColumns,
} from 'src/components/datagrid';
import { HitFormActions, HitFormGrid, HitTextField } from 'src/components/form';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import MenuPopover from 'src/components/menu-popover';
import { Equipo } from 'src/models/Equipo';

interface Props {
  data: Equipo[];
  isLoading: boolean;
  onDelete: (id: string) => any;
  onEdit?: (id: string) => any;
}

export const EquipoDataGrid: React.FC<Props> = ({ data, isLoading, onDelete, onEdit }) => {
  const hf = useForm({
    defaultValues: { email: '', roles: [] },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<string | undefined>();
  console.log(data);

  const columns = useColumns<typeof data[0]>([
    {
      field: 'nombre',
      type: 'string',
      align: 'center',
      renderHeader: () => <div className="px-2">{'Nombre'}</div>,
      renderCell: (params) => (
        <div className="flex gap-5 items-center w-full px-2">
          <Image src={params.row.logoUrl} className="w-10 h-10 rounded-full bg-gray-100 " />
          <Typography>{params.row.name}</Typography>
        </div>
      ),
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
              selectedIdRef.current = params.id.toString() || '';
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
        {!!onEdit && (
          <MenuItem
            onClick={() => {
              setOpenPopover(null);
              onEdit(selectedIdRef.current!);
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Editar
          </MenuItem>
        )}
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
