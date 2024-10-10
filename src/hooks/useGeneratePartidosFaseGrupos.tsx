import { useState, useEffect } from 'react';
import { Grupo } from 'src/features/copa/components/FaseGruposGenerator';
import { Equipo } from 'src/models/Equipo';

export interface Match {
  id?: string;
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
}

export interface Fecha {
  id: number;
  title: string;
  groupId: number; // Índice del grupo al que pertenece la fecha
  partidos: Match[];
}

const useGeneratePartidosFaseGrupos = (grupos: Grupo[]) => {
  const [fechas, setFechas] = useState<Fecha[]>([]);

  useEffect(() => {
    if (grupos.length > 0) {
      generateFechas();
    }
  }, [grupos]); // Ejecuta cuando cambian los grupos

  const generateFechas = () => {
    const newFechas: Fecha[] = [];
    grupos.forEach((grupo, grupoIndex) => {
      const equipos = [...grupo.equipos];
      const n = equipos.length;

      // Itera para crear rondas de partidos
      for (let round = 0; round < n - 1; round++) {
        const matches: Match[] = [];

        // Genera los partidos de cada ronda
        for (let i = 0; i < n / 2; i++) {
          const team1 = equipos[i];
          const team2 = equipos[n - 1 - i];
          matches.push({
            id: `${grupoIndex}-${round}-${i}`,
            equipoLocal: team1,
            equipoVisitante: team2,
          });
        }

        // Crea una fecha con los partidos generados
        newFechas.push({
          id: round + 1,
          title: `Fecha ${round + 1}`,
          groupId: grupoIndex,
          partidos: matches,
        });

        // Rotación de equipos (excepto el primero)
        const last = equipos.pop();
        if (last) equipos.splice(1, 0, last);
      }
    });
    setFechas(newFechas);
  };

  return {
    fechas,
  };
};

export default useGeneratePartidosFaseGrupos;
