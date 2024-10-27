import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAllFasesByCategory } from 'src/api/CategoriaRepository';
import { PATHS } from 'src/routes/paths';

interface ManageCategoriaPageProps {
  id: string;
}
const ManageCategoriaPage: React.FC<ManageCategoriaPageProps> = ({ id }) => {
  const navigate = useNavigate();
  const params = useParams<{ idCampeonato: string; idCategoria: string }>();

  const { data: fases } = useAllFasesByCategory(id);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() =>
            navigate(
              PATHS.dashboard.campeonatos.manageEquiposCategoria(
                params.idCampeonato || '',
                params.idCategoria || ''
              )
            )
          }
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Equipos</Typography>
            <Typography variant="subtitle1" className="line-clamp-1">
              Administra los equipos participantes de esta categoría
            </Typography>
          </div>
        </Card>
      </Grid>
      {fases.phases?.map((fase: any) => (
        <Grid item xs={12}>
          <Card
            sx={{ p: 2, cursor: 'pointer' }}
            onClick={() =>
              navigate(
                FASES[fase.type]?.navigateTo(
                  params.idCampeonato || '',
                  params.idCategoria || '',
                  fase.id
                )
              )
            }
          >
            <div className="flex flex-col gap-2">
              <Typography fontSize={18}>{FASES[fase.type]?.title}</Typography>
              <Typography variant="subtitle1" className="line-clamp-1">
                {FASES[fase.type]?.subtitle}
              </Typography>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ManageCategoriaPage;

const FASES: Record<
  string,
  {
    title: string;
    subtitle: string;
    navigateTo: (idCampeonato: string, idCategoria: string, idFase: string) => string;
  }
> = {
  general: {
    title: 'Fixture actual',
    subtitle: 'Administra el fixture de la fase regular',
    navigateTo: (idCampeonato, idCategoria, idFase) =>
      PATHS.dashboard.campeonatos.editFaseRegularCategoria(idCampeonato, idCategoria, idFase),
  },
  playoff: {
    title: 'Playoff',
    subtitle: 'Administra el fixture de la fase de playoff',
    navigateTo: (idCampeonato, idCategoria, idFase) =>
      PATHS.dashboard.campeonatos.editFasePlayoffCategoria(idCampeonato, idCategoria, idFase),
  },
};
