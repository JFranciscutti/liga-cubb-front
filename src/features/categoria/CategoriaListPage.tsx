import { Button, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useAllUsersQuery, useDeleteUserMutation } from 'src/api/userRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { CategoriaDataGrid } from './CategoriaDataGrid';
import { Categoria } from 'src/models/Categoria';

export default function CategoriaListPage() {
  //const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  //const usersQuery = useAllUsersQuery();
  //const deleteUserMutation = useDeleteUserMutation();

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | Categorias </title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Categorias"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              to={PATHS.dashboard.categorias.create}
              component={RouterLink}
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
          />
        </Card>
      </Container>
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
