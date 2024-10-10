import { useState } from 'react';
import { Equipo } from 'src/models/Equipo';

export interface Match {
  id?: string;
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
}

export interface Fecha {
  id: number;
  title: string; // Label de la fecha
  groupId?: number; // Índice del grupo al que pertenece la fecha
  partidos: Match[];
}

export const useGenerateEquipos = (equipos: any[]) => {
  const [fechas, setFechas] = useState<Fecha[]>([]);

  const cantidadEquipos = equipos.length;
  const cantidadFechas = cantidadEquipos - 1; // Número de fechas
  const cantidadPartidosPorFecha = cantidadEquipos / 2; // Cada fecha tendrá la mitad de partidos

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

  return { handleAutocompletar, fechas };
};
