import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useAllUsersQuery, useDeleteUserMutation } from 'src/api/userRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { CategoriaDataGrid } from './CategoriaDataGrid';
import { Categoria } from 'src/models/Categoria';
import { useRef, useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';
import { CategoriaForm } from './CategoriaForm';

export default function CategoriaListPage() {
  //const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  //const usersQuery = useAllUsersQuery();
  //const deleteUserMutation = useDeleteUserMutation();
  const [createOpen, setCreateOpen] = useState(false);
  const editingRef = useRef<Categoria | undefined>();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Categorias | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Categorias"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              onClick={() => setCreateOpen(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nueva categoría
            </Button>
          }
        />

        <Card>
          <CategoriaDataGrid
            data={CATEGORIAS_MOCK}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => {},
              })
            }
            onEdit={(id: number) => {
              editingRef.current = CATEGORIAS_MOCK.find((d) => d.id === id);
              setEditOpen(true);
            }}
          />
        </Card>
      </Container>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>
          <DialogHeader label="Nueva categoria" onClick={() => setCreateOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4 }}>
          <CategoriaForm onSubmit={async () => {}} />
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>
          <DialogHeader label="Editar categoria" onClick={() => setEditOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4 }}>
          <CategoriaForm
            edit
            onSubmit={async () => {}}
            initialValues={{
              name: editingRef.current?.nombre || '',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: 1, nombre: 'A' },
  { id: 2, nombre: 'B' },
  { id: 3, nombre: 'C' },
  { id: 4, nombre: 'D' },
  { id: 5, nombre: 'E' },
  { id: 6, nombre: 'A FEM' },
  { id: 7, nombre: 'B FEM' },
  { id: 8, nombre: 'C FEM' },
];
