import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { Equipo } from 'src/models/Equipo';
import Image from 'src/components/image';
import DeleteIcon from '@mui/icons-material/Delete';

const CANTIDADES_VALIDAS = ['2', '3', '4'];
const GRUPOS = ['A', 'B', 'C', 'D'];

const FaseGruposGenerator = ({ equipos }: { equipos: Equipo[] }) => {
  const cantidades_validas_v2 = CANTIDADES_VALIDAS.filter((c) => equipos.length % Number(c) === 0);

  const [cantidadGrupos, setCantidadGrupos] = useState(cantidades_validas_v2[0]);
  const [grupos, setGrupos] = useState<Record<string, Equipo[]>>(
    GRUPOS.reduce((acc, grupo) => ({ ...acc, [grupo]: [] }), {})
  );
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);

  const handleChangeCantidad = (event: SelectChangeEvent) => {
    const nuevaCantidad = event.target.value as string;
    setCantidadGrupos(nuevaCantidad);
    const nuevosGrupos = GRUPOS.slice(0, parseInt(nuevaCantidad)).reduce(
      (acc, grupo) => ({ ...acc, [grupo]: [] }),
      {}
    );
    setGrupos(nuevosGrupos);
    setEquipoSeleccionado(null); // Reset selected team when group count changes
  };

  const handleAgregarEquipo = (grupo: string) => {
    if (!equipoSeleccionado) return;
    setGrupos((prevGrupos) => ({
      ...prevGrupos,
      [grupo]: [...prevGrupos[grupo], equipoSeleccionado],
    }));
    setEquipoSeleccionado(null); // Reset selected team after adding
  };

  const handleEliminarEquipo = (grupo: string, equipoAEliminar: Equipo) => {
    setGrupos((prevGrupos) => ({
      ...prevGrupos,
      [grupo]: prevGrupos[grupo].filter((equipo) => equipo !== equipoAEliminar),
    }));
  };

  const isEquipoAsignado = (equipo: Equipo) => {
    return Object.values(grupos).flat().includes(equipo);
  };

  const isGrupoLleno = (grupo: string) => {
    return grupos[grupo].length === equipos.length / Number(cantidadGrupos);
  };

  return (
    <Grid container xs={12} className="p-6" gap={4}>
      <Grid item xs={12} className="flex justify-between">
        {equipos.map((e) => (
          <Box className="flex flex-col gap-1 items-center">
            <Image
              key={e.id}
              src={e.escudo}
              className={`w-10 h-10 rounded-full bg-gray-100 cursor-pointer ${
                isEquipoAsignado(e)
                  ? 'cursor-not-allowed opacity-50'
                  : equipoSeleccionado === e
                  ? 'border-2 border-blue-500 '
                  : ''
              }`}
              onClick={() => !isEquipoAsignado(e) && setEquipoSeleccionado(e)}
            />
            {isEquipoAsignado(e) && <p className="text-red-500 text-xs">Asignado</p>}
          </Box>
        ))}
      </Grid>
      <Grid item xs={4} className="flex flex-col justify-center gap-2">
        <p>Cantidad de grupos</p>
        <FormControl fullWidth>
          <Select value={cantidadGrupos} onChange={handleChangeCantidad}>
            {cantidades_validas_v2.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container xs={12} spacing={2}>
        {Object.entries(grupos).map(
          ([grupo, equipos]) =>
            parseInt(cantidadGrupos) >= GRUPOS.indexOf(grupo) + 1 && (
              <Grid key={grupo} item xs={12 / parseInt(cantidadGrupos)}>
                <Box className="flex flex-col p-4 border rounded-xl gap-4">
                  <h3 className="font-bold text-xl text-center">Grupo {grupo}</h3>
                  <ul>
                    {equipos.map((equipo, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <p className="line-clamp-1">{equipo.nombre}</p>
                        <IconButton
                          onClick={() => handleEliminarEquipo(grupo, equipo)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAgregarEquipo(grupo)}
                    disabled={
                      !equipoSeleccionado ||
                      isEquipoAsignado(equipoSeleccionado) ||
                      isGrupoLleno(grupo)
                    }
                  >
                    Agregar equipo
                  </Button>
                </Box>
              </Grid>
            )
        )}
      </Grid>
    </Grid>
  );
};

export default FaseGruposGenerator;
