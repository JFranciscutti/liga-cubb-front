import { Card, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAllFasesByCampeonato } from 'src/api/CampeonatoRepository';
import { PATHS } from 'src/routes/paths';

interface ManageCopaPageProps {
  id: string;
}
const ManageCopaPage: React.FC<ManageCopaPageProps> = ({ id }) => {
  const navigate = useNavigate();

  const { data: fases } = useAllFasesByCampeonato(id);

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
        {fases.phases?.map((fase: any) => (
          <Grid item xs={12}>
            <Card
              sx={{ p: 2, cursor: 'pointer' }}
              onClick={() => navigate(FASES[fase.type]?.navigateTo(id, fase.id))}
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
    </>
  );
};

export default ManageCopaPage;

const FASES: Record<
  string,
  { title: string; subtitle: string; navigateTo: (idCampeonato: string, idFase: string) => string }
> = {
  group: {
    title: 'Fixture actual',
    subtitle: 'Administra el fixture de la fase de grupos',
    navigateTo: (idCampeonato, idFase) =>
      PATHS.dashboard.campeonatos.editFaseGrupos(idCampeonato, idFase),
  },
  playoff: {
    title: 'Playoff',
    subtitle: 'Administra el fixture de la fase de playoff',
    navigateTo: (idCampeonato, idFase) =>
      PATHS.dashboard.campeonatos.editFasePlayoff(idCampeonato, idFase),
  },
};
