import { Button, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useAllUsersQuery, useDeleteUserMutation } from 'src/api/userRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { AdminUsersDataGrid } from './AdminUsersDataGrid';

export function AdminUserListPage() {
  //const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  //const usersQuery = useAllUsersQuery();
  //const deleteUserMutation = useDeleteUserMutation();

  return (
    <>
      <Helmet>
        <title>Usuarios | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading="Listado - Usuarios"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              to={PATHS.dashboard.usuarios.create}
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo Usuario
            </Button>
          }
        />

        <Card>
          <AdminUsersDataGrid
            data={[]}
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

export default AdminUserListPage;
