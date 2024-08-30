import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import CategoriaListPage from '../categoria/CategoriaListPage';
import { useParams } from 'react-router';
import { CampeonatoTypeEnum } from 'src/models/Campeonato';
import ManageCopaPage from '../copa/ManageCopaPage';
import { Container } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import { LoadingSpinner } from 'src/components/loading-spinner';
import ErrorPage from 'src/pages/ErrorPage';

const ManageCampeonatoPage = () => {
  const { id } = useParams();
  const { data: campeonato, isLoading, isError } = useCampeonatoQuery(id || '');
  const { themeStretch } = useSettingsContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (campeonato.type === CampeonatoTypeEnum.REGULAR) {
    return <CategoriaListPage campeonato={campeonato} />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={campeonato.name}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            { name: 'Administrar' },
          ]}
        />

        <ManageCopaPage id={Number(id)} />
      </Container>
    </>
  );
};
export default ManageCampeonatoPage;
