import { Card, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATHS } from 'src/routes/paths';

interface ManageCopaPageProps {
  id: string;
}
const ManageCopaPage: React.FC<ManageCopaPageProps> = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('idCampeonato', id || '');
  }, [id]);

  return (
    <>
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
      </Grid>
    </>
  );
};

export default ManageCopaPage;
