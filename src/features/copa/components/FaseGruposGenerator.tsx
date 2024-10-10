import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Equipo } from 'src/models/Equipo';
import Image from 'src/components/image';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useGenerateEquipos } from 'src/hooks/useGenerateEquipos';
import CreateFixtureForCopa from 'src/features/fixtures/CreateFixtureForCopa';
import useGeneratePartidosFaseGrupos, { Fecha } from 'src/hooks/useGeneratePartidosFaseGrupos';

const CANTIDADES_VALIDAS = ['2', '3', '4', '6', '8', '12', '16'];
const GRUPOS = Array.from({ length: 18 }, (_, i) => (i + 1).toString());

export interface Grupo {
  id: number;
  label: string; // A, B, C o D
  equipos: Equipo[];
}

const FaseGruposGenerator = ({ equipos }: { equipos: Equipo[] }) => {
  const cantidades_validas_v2 = CANTIDADES_VALIDAS.filter((c) => equipos.length % Number(c) === 0);

  const [cantidadGrupos, setCantidadGrupos] = useState(cantidades_validas_v2[0]);
  const [grupos, setGrupos] = useState<Grupo[]>(
    GRUPOS.map((grupo, index) => ({ id: index, label: grupo, equipos: [] as Equipo[] }))
  );
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [showFechas, setShowFechas] = useState(false);

  const handleChangeCantidad = (event: SelectChangeEvent) => {
    const nuevaCantidad = event.target.value as string;
    setCantidadGrupos(nuevaCantidad);
    const nuevosGrupos = GRUPOS.slice(0, parseInt(nuevaCantidad)).map((grupo, index) => ({
      id: index,
      label: grupo,
      equipos: [] as Equipo[],
    }));
    setGrupos(nuevosGrupos);
    setEquipoSeleccionado(null); // Reset selected team when group count changes
  };

  const handleAgregarEquipo = (grupoId: number) => {
    if (!equipoSeleccionado) return;
    setGrupos((prevGrupos) =>
      prevGrupos.map((grupo) =>
        grupo.id === grupoId ? { ...grupo, equipos: [...grupo.equipos, equipoSeleccionado] } : grupo
      )
    );
    setEquipoSeleccionado(null); // Reset selected team after adding
  };

  const handleEliminarEquipo = (grupoId: number, equipoAEliminar: Equipo) => {
    setGrupos((prevGrupos) =>
      prevGrupos.map((grupo) =>
        grupo.id === grupoId
          ? { ...grupo, equipos: grupo.equipos.filter((equipo) => equipo !== equipoAEliminar) }
          : grupo
      )
    );
  };

  const isEquipoAsignado = (equipo: Equipo) => {
    return grupos.some((grupo) => grupo.equipos.includes(equipo));
  };

  const isGrupoLleno = (grupoId: number) => {
    const grupo = grupos.find((g) => g.id === grupoId);
    return grupo ? grupo.equipos.length === equipos.length / Number(cantidadGrupos) : false;
  };

  const handleAutoCompletar = () => {
    const nuevosGrupos: Grupo[] = GRUPOS.slice(0, parseInt(cantidadGrupos)).map((grupo, index) => ({
      id: index,
      label: grupo,
      equipos: [] as Equipo[],
    }));
    const equiposDisponibles = [...equipos];
    while (equiposDisponibles.length > 0) {
      for (let i = 0; i < parseInt(cantidadGrupos); i++) {
        if (equiposDisponibles.length === 0) break;
        const equipoAleatorio = equiposDisponibles.splice(
          Math.floor(Math.random() * equiposDisponibles.length),
          1
        )[0];
        nuevosGrupos[i].equipos.push(equipoAleatorio);
      }
    }
    setGrupos(nuevosGrupos);
  };

  const handleGuardar = () => {
    setShowFechas(true);
  };

  const handleSaveFechas = (fechas: Fecha[]) => {
    console.log(fechas);
  };

  // Crea una función para verificar si los grupos están llenos
  const areGroupsFull = () => {
    const requiredTeamCount = equipos.length / Number(cantidadGrupos);
    return grupos.every((grupo) => grupo.equipos.length === requiredTeamCount);
  };

  return (
    <>
      <Grid container className="p-6" gap={4}>
        <Grid item xs={12} className="grid grid-cols-8 gap-6 ">
          {equipos.map((e) => (
            <Box key={e.id} className="flex flex-col gap-1 items-center">
              <Image
                src={e.logo}
                className={`w-10 h-10 rounded-full bg-gray-100 cursor-pointer ${
                  isEquipoAsignado(e)
                    ? 'cursor-not-allowed opacity-50'
                    : equipoSeleccionado === e
                    ? 'border-4 border-blue-500 '
                    : ''
                }`}
                onClick={() => !isEquipoAsignado(e) && setEquipoSeleccionado(e)}
              />
              {isEquipoAsignado(e) && <p className="text-red-500 text-xs">Asignado</p>}
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} className="flex justify-between w-full items-center">
          <Box className="flex flex-col justify-center gap-2">
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
          </Box>
          <Box>
            <Button variant="contained" onClick={handleAutoCompletar}>
              Autocompletar al azar
            </Button>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          {grupos.map(
            (grupo) =>
              parseInt(cantidadGrupos) >= grupo.id + 1 && (
                <Grid key={grupo.id} item xs={12 / parseInt(cantidadGrupos)}>
                  <Box className="flex flex-col p-4 border rounded-xl gap-4">
                    <h3 className="font-bold text-xl text-center">Grupo {grupo.label}</h3>
                    <ul className="flex flex-col gap-3">
                      {grupo.equipos.map((equipo, index) => (
                        <li key={index} className="flex items-center justify-between w-full">
                          <Box className="flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50">
                            <Image src={equipo.logo} className="h-10 w-10 min-w-10" />
                          </Box>
                          <p className="line-clamp-1 " style={{ whiteSpace: 'nowrap' }}>
                            {equipo.name}
                          </p>
                          <IconButton
                            onClick={() => handleEliminarEquipo(grupo.id, equipo)}
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
                      onClick={() => handleAgregarEquipo(grupo.id)}
                      disabled={
                        !equipoSeleccionado ||
                        isEquipoAsignado(equipoSeleccionado) ||
                        isGrupoLleno(grupo.id)
                      }
                    >
                      Agregar equipo
                    </Button>
                  </Box>
                </Grid>
              )
          )}
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <Button
            variant="contained"
            onClick={handleGuardar}
            fullWidth
            sx={{ p: 2 }}
            disabled={!areGroupsFull()} // Deshabilita el botón si los grupos no están llenos
          >
            Guardar Grupos
          </Button>
        </Grid>
      </Grid>

      <FaseGruposFixture grupos={grupos} enabled={showFechas} handleSaveFechas={handleSaveFechas} />
    </>
  );
};

export default FaseGruposGenerator;

const FaseGruposFixture = ({
  grupos,
  enabled = false,
  handleSaveFechas,
}: {
  grupos: Grupo[];
  enabled: boolean;
  handleSaveFechas: (fechas: Fecha[]) => void;
}) => {
  const { fechas } = useGeneratePartidosFaseGrupos(grupos);

  if (!enabled) {
    return null; // Retorna null en lugar de un fragmento vacío
  }

  return (
    <>
      {grupos.map((grupo) => (
        <Box className="flex flex-col gap-2 ">
          <Box className="flex bg-slate-100 rounded-sm w-full items-center justify-center">
            <Typography sx={{ color: 'black' }}>Fixture - Grupo {grupo.label}</Typography>
          </Box>
          <CreateFixtureForCopa
            key={grupo.id}
            equipos={grupo.equipos}
            fechas={fechas.filter((f) => f.groupId === grupo.id)} // Filtra fechas por grupo
          />
        </Box>
      ))}
      <Box>
        <Button
          variant="contained"
          onClick={() => handleSaveFechas(fechas)}
          fullWidth
          sx={{ p: 2 }}
        >
          Guardar Grupos
        </Button>
      </Box>
    </>
  );
};
