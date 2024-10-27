import { Box, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCampeonatoQuery, useOneFaseCampeonatoQuery } from 'src/api/CampeonatoRepository';
import EditCreatedCopaFixture from '../copa/components/EditCreatedCopaFixture';

const EditFaseGruposCopa: React.FC = () => {
  const params = useParams<{ idCampeonato: string; idFase: string }>();
  const { data: faseData, isLoading, isError } = useOneFaseCampeonatoQuery(params.idFase || '');

  const { data: campeonatoData } = useCampeonatoQuery(params.idCampeonato || '');

  return (
    <>
      <Helmet>
        <title>Fase de Grupos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fase de Grupos - ${campeonatoData?.name}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            {
              name: 'Administrar',
              href: PATHS.dashboard.campeonatos.manage(params.idCampeonato || ''),
            },
            { name: 'Fase de Grupos' },
          ]}
        />

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {faseData.map((grupo, index: number) => (
            <>
              <Box key={index}>Grupo {grupo.name}</Box>
              <Box>
                {grupo.teams.map((equipo: any) => (
                  <Box key={equipo.id}>{equipo.name}</Box>
                ))}
              </Box>
              {<EditCreatedCopaFixture partidos={grupo.matches} isLoading={false} />}
            </>
          ))}
        </Card>
      </Container>
    </>
  );
};

export default EditFaseGruposCopa;
