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
import { Equipo } from 'src/models/Equipo';
import EditMatchModal from './components/EditMatchModal';

interface Fecha {
  id: number;
  title: string; // Label de la fecha
  partidos: { equipoLocal: Equipo; equipoVisitante: Equipo }[];
}

interface FixtureManagerBaseProps {
  equipos: any[];
  exists?: boolean;
}

type MapeoPartido = {
  dateNumber: number;
  homeTeamId: string;
  awayTeamId: string;
};

const FixtureManagerBase: FC<FixtureManagerBaseProps> = ({ equipos, exists = false }) => {
  const cantidadEquipos = equipos.length;
  const cantidadPartidosPorFecha = cantidadEquipos / 2; // Cada fecha tendrá la mitad de partidos
  const cantidadFechas = cantidadEquipos - 1; // Número de fechas
  const [expanded, setExpanded] = useState<number | false>(false);
  const [fechas, setFechas] = useState<Fecha[]>([]);
  const currentMatchSelected = useRef<any | undefined>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  // Función para manejar la expansión de los accordions
  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  // HOOOOOOOKKKKK
  // Generar partidos para cada fecha, asegurando que no se repitan y que no juegue dos veces el mismo equipo
  const generarPartidos = (
    equipos: Equipo[],
    partidosPrevios: Set<string>,
    equiposUsados: Set<string>
  ): { equipoLocal: Equipo; equipoVisitante: Equipo }[] => {
    const partidos: { equipoLocal: Equipo; equipoVisitante: Equipo }[] = [];

    for (let i = 0; i < cantidadEquipos; i++) {
      for (let j = i + 1; j < cantidadEquipos; j++) {
        const emparejamiento = `${equipos[i].id}-${equipos[j].id}`;
        const emparejamientoInverso = `${equipos[j].id}-${equipos[i].id}`;

        if (
          !partidosPrevios.has(emparejamiento) &&
          !partidosPrevios.has(emparejamientoInverso) &&
          !equiposUsados.has(equipos[i].id) &&
          !equiposUsados.has(equipos[j].id)
        ) {
          partidos.push({ equipoLocal: equipos[i], equipoVisitante: equipos[j] });
          partidosPrevios.add(emparejamiento);
          partidosPrevios.add(emparejamientoInverso);
          equiposUsados.add(equipos[i].id);
          equiposUsados.add(equipos[j].id);

          // Limitar a la cantidad necesaria de partidos
          if (partidos.length >= cantidadPartidosPorFecha) {
            return partidos;
          }
        }
      }
    }
    return partidos; // Retorna los partidos generados
  };

  const handleSaveFecha = (fecha: Fecha) => {
    if (fecha.partidos.every((partido) => partido.equipoLocal && partido.equipoVisitante)) {
      console.log(fecha); // Muestra el objeto Fecha en la consola
    } else {
      alert('Todos los partidos deben tener equipos seleccionados.');
    }
  };

  const handleAutocompletar = () => {
    const partidosPrevios = new Set<string>(); // Almacena partidos jugados en fechas anteriores
    const nuevasFechas = Array.from({ length: cantidadFechas }, (_, fechaIndex) => {
      const equiposUsados = new Set<string>();
      const partidos = generarPartidos(equipos, partidosPrevios, equiposUsados);
      return {
        id: fechaIndex + 1,
        title: `Fecha ${fechaIndex + 1}`,
        partidos: partidos,
      } as Fecha; // Retorna un objeto de tipo Fecha
    });
    setFechas(nuevasFechas);
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
        <Box className="flex w-full mt-2 justify-end">
          <Button
            variant="contained"
            disabled={fechas.length === 0}
            onClick={() => console.log(mapearPartidos(fechas))}
          >
            Guardar fechas
          </Button>
        </Box>
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

export default FixtureManagerBase;
