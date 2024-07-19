import { capitalize, IconButton, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import { Jugador } from 'src/models/Jugador';
import { PATHS } from 'src/routes/paths';

interface Props {
  data: Jugador[];
  isLoading: boolean;
  onDelete: (id: number) => any;
  onEdit?: (id: number) => any;
}

export const JugadorDataGrid: React.FC<Props> = ({ data, isLoading, onDelete, onEdit }) => {
  const hf = useForm({
    defaultValues: { email: '', roles: [] },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<number | undefined>();

  const columns = useColumns<typeof data[0]>([
    {
      field: 'nombre',
      headerName: 'Nombre',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'nro_socio',
      headerName: 'Nro de Socio',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
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
              selectedIdRef.current = Number(params.id);
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
              <Controller
                name="apellido"
                render={(field) => <HitTextField {...field} label="Apellido" />}
              />
              <Controller
                name="nro_socio"
                render={(field) => <HitTextField {...field} label="Número de Socio" />}
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
