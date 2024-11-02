import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { FC, useRef, useState } from 'react';
import Image from 'src/components/image';
import EditMatchModal from './components/EditMatchModal';
import { LoadingSpinner } from 'src/components/loading-spinner';
import { useParams } from 'react-router-dom';
import { useAllEquiposByCategory } from 'src/api/EquipoRepository';
import { useEditPartidoMutation, useOnePartidoQuery } from 'src/api/CategoriaRepository';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';

interface FixtureManagerBaseProps {
  fecha: any[];
  exists?: boolean;
  isLoading: boolean;
}

export const EditCreatedFixture: FC<FixtureManagerBaseProps> = ({ fecha, isLoading }) => {
  const currentMatchSelected = useRef<any | undefined>();
  const { idFase, idCategoria } = useParams();

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const { data: equipos } = useAllEquiposByCategory(idCategoria || '');
  const editPartidoMutation = useEditPartidoMutation();

  const { data: match, isLoading: matchLoading } = useOnePartidoQuery(
    currentMatchSelected.current?.homeTeam,
    currentMatchSelected.current?.awayTeam,
    currentMatchSelected.current?.phaseId || '',
    !!currentMatchSelected.current
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Card className="flex flex-col gap-6 w-full py-4 px-2">
        {fecha.map((partido, partidoIndex) => (
          <Grid container className="flex items-center gap-2 justify-between" key={partidoIndex}>
            <Grid item xs={9} className="flex items-center justify-between w-full">
              {/* Contenedor del equipo local */}
              <Grid item className="flex items-center gap-2" style={{ flex: 1 }}>
                <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                  <Image src={partido.equipoLocal.logoUrl} className="h-10 w-10 min-w-10" />
                </Box>
                <p className="line-clamp-1" style={{ whiteSpace: 'nowrap' }}>
                  {partido.equipoLocal.name}
                </p>
              </Grid>

              {/* Contenedor del "VS" */}
              <Grid
                item
                className="flex items-center justify-center"
                style={{ flexShrink: 0, minWidth: '50px' }}
              >
                <Typography>VS</Typography>
              </Grid>

              {/* Contenedor del equipo visitante */}
              <Grid
                item
                className="flex items-center gap-2"
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <p className="line-clamp-1" style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                  {partido.equipoVisitante.name}
                </p>
                <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                  <Image src={partido.equipoVisitante.logoUrl} className="h-10 w-10 min-w-10" />
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={2} className="flex gap-2 justify-end">
              <Button
                variant="contained"
                onClick={() => {
                  currentMatchSelected.current = {
                    homeTeam: partido.equipoLocal.id,
                    awayTeam: partido.equipoVisitante.id,
                    phaseId: idFase || '',
                  };
                  setEditModalOpen(true);
                }}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        ))}
      </Card>
      <EditMatchModal
        open={editModalOpen}
        match={match}
        isLoading={matchLoading}
        handleClose={() => {
          setEditModalOpen(false);
          currentMatchSelected.current = undefined;
        }}
        handleSave={async (values) => {
          await editPartidoMutation.mutateAsync({
            ...values,
            date: moment(values.date).isValid() ? moment(values.date).format('YYYY-MM-DDTHH:mm:ss') : null,
            phaseId: idFase || '',
          });
          enqueueSnackbar('Partido editado correctamente', { variant: 'success' });
          setEditModalOpen(false);
          currentMatchSelected.current = undefined;
        }}
        elegibleTeams={equipos.teams || []}
      />
    </>
  );
};

export default EditCreatedFixture;
