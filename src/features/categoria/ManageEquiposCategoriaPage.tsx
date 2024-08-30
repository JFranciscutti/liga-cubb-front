import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
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
import LoadingScreen from 'src/components/loading-screen';

const ManageEquiposCategoriaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { data: categoriaData, isLoading: categoriaLoading } = useCategoriaQuery(params.id || '');
  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposQuery();

  if (categoriaLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Categoria ${categoriaData.name} - Lista de equipos`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            {
              name: `Categoria ${categoriaData.name}`,
              href: PATHS.dashboard.categorias.edit(params.id!),
            },
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
            data={allEquipos}
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
              equipos={[]}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageEquiposCategoriaPage;
