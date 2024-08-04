import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';

interface ManageCopaPageProps {
  id: number;
}
const ManageCopaPage: React.FC<ManageCopaPageProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.campeonatos.manageEquiposCopa(id))}
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Equipos</Typography>
            <Typography variant="subtitle1" className="line-clamp-1">
              Administra los equipos participantes de esta copa
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.campeonatos.manageGroupsCopa(id))}
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Fase de grupos</Typography>
            <Typography variant="subtitle1" className="line-clamp-1">
              Administra los grupos de la fase de grupos
            </Typography>
          </div>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.campeonatos.manageFixtureGroupsCopa(id))}
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Fixtures de grupos</Typography>
            <Typography variant="subtitle1" className="line-clamp-1">
              Administra los partidos de la fase de grupos
            </Typography>
          </div>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.categorias.playoff(id))}
        >
          <div className="flex flex-col gap-2 ">
            <Typography fontSize={18}>Playoffs</Typography>
            <Typography variant="subtitle1" className="line-clamp-1">
              Administra la fase de playoffs
            </Typography>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManageCopaPage;
