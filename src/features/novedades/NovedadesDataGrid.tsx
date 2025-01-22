import { IconButton, MenuItem } from '@mui/material';
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
import Image from 'src/components/image';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { Novedad } from 'src/models/Novedad';

interface Props {
  data: Novedad[];
  isLoading: boolean;
  onDelete: (id: string) => any;
  onEdit?: (id: string) => any;
}

export const NovedadDataGrid: React.FC<Props> = ({ data, isLoading, onDelete, onEdit }) => {
  const hf = useForm({
    defaultValues: { title: '' },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<string | undefined>();

  const columns = useColumns<Novedad>([
    {
        field: 'image',
        type: 'avatar',
        headerName: "Imagen",
        renderCell: (params) => (
              <Image src={params.row.image} className="w-10 h-10 rounded-full bg-gray-100 " />
          ),
    },
    {
      field: 'title',
      headerName: 'Titulo',
      type: 'string',
    },
   
    {
      field: 'created_at',
      headerName: 'Fecha de creación',
      type: 'string',
      renderCell: (params) => params.value?.format('DD/MM/YYYY'),
    },
    {
      field: 'visible',
      headerName: '¿Está publicada?',
      type: 'string',
      align:'center',
      headerAlign:'center',
      renderCell: (params) =>  params.value ? 'Si' : 'No',
    },
    {
      field: 'action',
      headerName: 'Acciones',
      maxWidth: 100,
      type: 'actions',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              selectedIdRef.current = String(params.id) || '';
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
                name="title"
                render={(field) => <HitTextField {...field} label="Titulo" />}
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
