import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router';
import DialogHeader from 'src/components/DialogHeader';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useState } from 'react';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { EquipoDataGrid } from '../equipo/EquipoDataGrid';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import {
  AgregarEquipoCategoriaForm,
  EquipoCategoriaFormType,
} from '../categoria/AgregarEquipoCategoria';

const ManageEquiposCopaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    Number(params.id)
  );
  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposQuery();

  if (campeonatoLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Lista de equipos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: campeonatoData.name,
              href: PATHS.dashboard.campeonatos.manage(params.id!),
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
            data={[]}
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
              equipos={allEquipos}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageEquiposCopaPage;
