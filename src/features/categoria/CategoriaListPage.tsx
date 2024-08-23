import { Button, Card, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { CategoriaDataGrid } from './CategoriaDataGrid';
import { useState } from 'react';
import DialogHeader from 'src/components/DialogHeader';
import { CategoriaForm } from './CategoriaForm';
import {
  useAllCategoriasQuery,
  useCreateCategoriaMutation,
  useDeleteCategoriaMutation,
  useEditCategoriaMutation,
} from 'src/api/CategoriaRepository';
import { enqueueSnackbar } from 'notistack';
import { PATHS } from 'src/routes/paths';

interface CategoriaListPageProps {
  campeonato: any;
}

const CategoriaListPage: React.FC<CategoriaListPageProps> = ({ campeonato }) => {
  const confirm = useConfirm();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [editOpen, setEditOpen] = useState(false);
  const categorias = campeonato.categories || [];
  const createCategoriaMutation = useCreateCategoriaMutation();
  const editCategoriaMutation = useEditCategoriaMutation();
  const deleteCategoriaMutation = useDeleteCategoriaMutation();

  const foundCategoria = categorias?.find((d: any) => d.id === selectedId);
  const parsedCategoria =
    foundCategoria === undefined
      ? undefined
      : {
          ...foundCategoria,
        };

  return (
    <>
      <Helmet>
        <title>Categorias | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Listado de Categorias - ${campeonato.name}`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            { name: 'Categorias' },
          ]}
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
            data={categorias}
            isLoading={false}
            onDelete={(id: any) =>
              confirm({
                action: async () => deleteCategoriaMutation.mutateAsync(id),
              })
            }
            onEdit={(id: string) => {
              setSelectedId(id);
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
          <CategoriaForm
            onSubmit={async (values) =>
              createCategoriaMutation.mutateAsync(
                { ...values, leagueName: campeonato.name },
                {
                  onSuccess: () => {
                    enqueueSnackbar({
                      variant: 'success',
                      message: 'Categoria creada exitosamente',
                    });
                    setCreateOpen(false);
                  },
                }
              )
            }
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>
          <DialogHeader label="Editar categoria" onClick={() => setEditOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ mb: 4 }}>
          <CategoriaForm
            edit
            onSubmit={async (values) =>
              editCategoriaMutation.mutateAsync(
                { ...values, id: selectedId! },
                {
                  onSuccess: () => {
                    enqueueSnackbar({
                      variant: 'success',
                      message: 'Categoria editada exitosamente',
                    });
                    setCreateOpen(false);
                  },
                }
              )
            }
            initialValues={{
              name: parsedCategoria?.nombre || '',
              gender: parsedCategoria?.genero || '',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CategoriaListPage;
