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
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'src/components/image';
import { Fecha, useGenerateEquipos } from 'src/hooks/useGenerateEquipos';

interface FixtureManagerBaseProps {
  equipos: any[];
  exists?: boolean;
  handleSave: (values: any[]) => void;
}

type MapeoPartido = {
  dateNumber: number;
  homeTeamId: string;
  awayTeamId: string;
};

const CreateFixture: FC<FixtureManagerBaseProps> = ({ equipos, handleSave }) => {
  const { fechas: generatedFechas, handleAutocompletar } = useGenerateEquipos(equipos);
  const [fechas, setFechas] = useState<Fecha[]>([]);
  const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    setFechas(generatedFechas);
  }, [generatedFechas]);


  // Función para manejar la expansión de los accordions
  const handleChangeAccordion =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSelectChange =
    (fechaIndex: number, partidoIndex: number, teamType: 'home' | 'away') =>
    (event: SelectChangeEvent<string>) => {
      console.log(fechaIndex, partidoIndex, teamType);

      setFechas((prevFechas) =>
        prevFechas.map((fecha, fIndex) => {
          if (fIndex !== fechaIndex) return fecha;
          return {
            ...fecha,
            partidos: fecha.partidos.map((partido, pIndex) => {
              if (pIndex !== partidoIndex) return partido;
              return {
                ...partido,
                equipoLocal:
                  teamType === 'home'
                    ? { ...partido.equipoLocal, id: event.target.value as string }
                    : partido.equipoLocal,
                equipoVisitante:
                  teamType === 'away'
                    ? { ...partido.equipoVisitante, id: event.target.value as string }
                    : partido.equipoVisitante,
              };
            }),
          };
        })
      );
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
            onChange={handleChangeAccordion(fechaIndex)}
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
                  <Grid item xs={5}>
                    <Select
                      fullWidth
                      value={partido.equipoLocal.id}
                      onChange={handleSelectChange(fechaIndex, partidoIndex, 'home')}
                    >
                      {equipos.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box className="flex items-center gap-2">
                            <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                              <Image src={e.logo} className="h-10 w-10 min-w-10" />
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
                  <Grid item xs={5}>
                    <Select
                      fullWidth
                      value={partido.equipoVisitante.id}
                      onChange={handleSelectChange(fechaIndex, partidoIndex, 'away')}
                    >
                      {equipos.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box className="flex items-center gap-2">
                            <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                              <Image src={e.logo} className="h-10 w-10 min-w-10" />
                            </Box>
                            <p className="line-clamp-1" style={{ whiteSpace: 'nowrap' }}>
                              {e.name}
                            </p>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
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
            onClick={() => handleSave(mapearPartidos(fechas))}
          >
            Guardar fechas
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default CreateFixture;
