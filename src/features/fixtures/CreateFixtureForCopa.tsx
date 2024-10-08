import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'src/components/image';
import EditMatchModal from './components/EditMatchModal';
import { Fecha, useGenerateEquipos } from 'src/hooks/useGenerateEquipos';

interface FixtureManagerBaseProps {
  equipos: any[];
  fechas: Fecha[];
  handleAutocompletar: () => void;
  exists?: boolean;
}

type MapeoPartido = {
  dateNumber: number;
  homeTeamId: string;
  awayTeamId: string;
};

const CreateFixtureForCopa: FC<FixtureManagerBaseProps> = ({
  equipos,
  fechas,
  handleAutocompletar,
  exists = false,
}) => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const currentMatchSelected = useRef<any | undefined>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  // Función para manejar la expansión de los accordions
  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  function mapearPartidos(fechas: Fecha[]): MapeoPartido[] {
    return fechas.flatMap((fecha) =>
      fecha.partidos.map((partido) => ({
        dateNumber: fecha.id,
        homeTeamId: partido.equipoLocal.id,
        awayTeamId: partido.equipoVisitante.id,
      }))
    );
  }

  return (
    <>
      <Card className="w-full py-4 px-2">
        {fechas.map((fecha, fechaIndex) => (
          <Accordion
            key={fechaIndex}
            expanded={expanded === fechaIndex}
            onChange={handleChange(fechaIndex)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="w-full flex justify-between items-center pr-10">
                <Typography>{fecha.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4">
              {fecha.partidos.map((partido, partidoIndex) => (
                <Grid
                  container
                  className="flex items-center justify-center gap-2"
                  key={partidoIndex}
                >
                  <Grid item xs={exists ? 4 : 5}>
                    <Select fullWidth defaultValue={partido.equipoLocal.id} disabled={exists}>
                      {equipos.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box className="flex items-center gap-2">
                            <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                              <Image src={e.logoUrl} className="h-10 w-10 min-w-10" />
                            </Box>
                            <p className="line-clamp-1" style={{ whiteSpace: 'nowrap' }}>
                              {e.name}
                            </p>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Typography>VS</Typography>
                  <Grid item xs={exists ? 4 : 5}>
                    <Select fullWidth defaultValue={partido.equipoVisitante.id} disabled={exists}>
                      {equipos.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box className="flex items-center gap-2">
                            <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                              <Image src={e.logoUrl} className="h-10 w-10 min-w-10" />
                            </Box>
                            <p className="line-clamp-1" style={{ whiteSpace: 'nowrap' }}>
                              {e.name}
                            </p>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  {exists && (
                    <Grid item xs={3} className="flex gap-2 justify-end">
                      <Button
                        variant="contained"
                        onClick={() => {
                          currentMatchSelected.current = {
                            dateNumber: fechaIndex,
                            homeTeam: partido.equipoLocal,
                            awayTeam: partido.equipoVisitante,
                          };
                          setEditModalOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button variant="contained">Ver</Button>
                    </Grid>
                  )}
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        {fechas.length === 0 && (
          <Box className="flex flex-col p-4 items-center justify-center gap-5">
            <Typography>Esta categoría aún no tiene fechas creadas.</Typography>
            <Button variant="contained" onClick={handleAutocompletar}>
              Autocompletar equipos
            </Button>
          </Box>
        )}
      </Card>
      <EditMatchModal
        open={editModalOpen}
        match={currentMatchSelected.current}
        handleClose={() => {
          setEditModalOpen(false);
          currentMatchSelected.current = undefined;
        }}
        handleSave={() => {}}
      />
    </>
  );
};

export default CreateFixtureForCopa;
