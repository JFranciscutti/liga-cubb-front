import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router';
import DialogHeader from 'src/components/DialogHeader';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useState } from 'react';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { AgregarEquipoCategoriaForm, EquipoCategoriaFormType } from './AgregarEquipoCategoria';
import { EquipoDataGrid } from '../equipo/EquipoDataGrid';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';

const ManageEquiposCategoriaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { data: categoriaData } = useCategoriaQuery(Number(params.id));
  const { data: allEquipos } = useAllEquiposQuery();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Categoria ${categoriaData.nombre} - Lista de equipos`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: `Categoria ${categoriaData.nombre}`, href: PATHS.dashboard.categorias.edit(1) },
            { name: 'Administrar equipos' },
          ]}
          action={
            <Button
              onClick={() => setAddOpen(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Agregar equipo
            </Button>
          }
        />
        <Card>
          <EquipoDataGrid
            data={allEquipos.filter((equipo) => equipo.category_id === categoriaData.id)}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => {},
              })
            }
          />
        </Card>
        <Dialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          PaperProps={{ style: { width: '100%' } }}
        >
          <DialogTitle>
            <DialogHeader label="Agregar equipo" onClick={() => setAddOpen(false)} />
          </DialogTitle>
          <DialogContent sx={{ mb: 4, width: '100%' }}>
            <AgregarEquipoCategoriaForm
              onSubmit={async (values: EquipoCategoriaFormType) => {}}
              equipos={allEquipos.filter((equipo) => equipo.category_id === undefined)}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageEquiposCategoriaPage;
