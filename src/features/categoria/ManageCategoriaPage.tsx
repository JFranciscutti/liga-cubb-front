import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';

interface ManageCategoriaPageProps {
  id: number;
}
const ManageCategoriaPage: React.FC<ManageCategoriaPageProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={6}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.categorias.manageEquipos(id))}
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Equipos</Typography>
            <Typography variant="subtitle1">
              Administra los equipos participantes de esta categoría
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ p: 2, cursor: 'pointer' }}>
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Fixture actual</Typography>
            <Typography variant="subtitle1">Administra el fixture de la fase regular</Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ p: 2, cursor: 'pointer' }}>
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Goleadores</Typography>
            <Typography variant="subtitle1">Mira los/as goleadores/as de la categoría</Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ p: 2, cursor: 'pointer' }}>
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Tarjetas</Typography>
            <Typography variant="subtitle1">Mira los/as amonestados/as de la categoría</Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{ p: 2, cursor: 'pointer' }}
          onClick={() => navigate(PATHS.dashboard.categorias.playoff(id))}
        >
          <div className="flex flex-col gap-2">
            <Typography fontSize={18}>Playoffs</Typography>
            <Typography variant="subtitle1">
              Administra el fixture de la fase de playoffs
            </Typography>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManageCategoriaPage;
