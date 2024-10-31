import { IconButton, MenuItem, Typography, capitalize } from '@mui/material';
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
import MenuPopover from 'src/components/menu-popover';
import { Campeonato, CampeonatoTypeEnum } from 'src/models/Campeonato';
import { PATHS } from 'src/routes/paths';

interface Props {
  data: Campeonato[];
  isLoading: boolean;
  onDelete: (id: string) => any;
  onMarkAsMain: (id: string) => any;
}

type CampeonatoFilterType = {
  nombre: string;
};

const defaultValues = {
  nombre: '',
};

export const CampeonatoDataGrid: React.FC<Props> = ({ data, onDelete, onMarkAsMain }) => {
  const hf = useForm<CampeonatoFilterType>({
    defaultValues: defaultValues,
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<{id: string | undefined, enabled: boolean, type: CampeonatoTypeEnum}>();

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
      field: 'type',
      headerName: 'Tipo',
      type: 'string',
      renderCell: (params) => (
        <div className="w-full px-2">
          <Typography>
            {params.row.type === CampeonatoTypeEnum.COPA ? 'Copa' : 'Torneo Regular'}
          </Typography>
        </div>
      ),
    },
    {
      field: 'enabled',
      headerName: 'Estado',
      type: 'string',
      renderCell: (params) => (
        <div className="w-full px-2">
          <Typography>
            {!!params.row.enabled ? 'Visible' : 'No visible'}
          </Typography>
        </div>
      ),
    },
    {
      field: 'current',
      headerName: '',
      type: 'string',
      renderCell: (params) => (
        <div className="w-full px-2">
          <Typography>
            {!!params.row.current ? 'Principal' : ''}
          </Typography>
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
              selectedIdRef.current = { id: params.row.id, enabled: params.row.enabled, type: params.row.type };
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
          to={PATHS.dashboard.campeonatos.manage(selectedIdRef.current?.id!)}
        >
          <Iconify icon="mdi:pencil" />
          Administrar
        </MenuItem>

        {selectedIdRef.current?.type === CampeonatoTypeEnum.REGULAR && (
          <MenuItem
            onClick={() => {
              setOpenPopover(null);
              onMarkAsMain(selectedIdRef.current?.id!);
            }}
          >
            <Iconify icon={'mdi:trophy'} />
            Marcar como torneo actual
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            setOpenPopover(null);
            onDelete(selectedIdRef.current?.id!);
          }}
        >
          <Iconify icon={selectedIdRef.current?.enabled ? 'mdi:eye-off' : 'mdi:eye'} />
          {selectedIdRef.current?.enabled ? 'Ocultar' : 'Mostrar'}
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
