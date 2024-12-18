import React from 'react';
import { Box } from '@mui/material';
import { FinalTeamBox, TeamBox } from './TeamBox';
import { Moment } from 'moment';

export enum MatchStatus {
  PENDING = 'Upcoming',
  PLAYED = 'Played',
  IN_PROGRESS = 'Suspended',
}

export interface Match {
  date: Moment;
  dateNumber: number;
  field: string;
  linemenTeam: string;
  scorer: string;
  comments: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamPlayerGoals: any[];
  awayTeamPlayerGoals: any[];
  homeTeamYellowCards: any[];
  awayTeamYellowCards: any[];
  homeTeamRedCards: any[];
  awayTeamRedCards: any[];
  status: MatchStatus;
}

export interface Team {
  id: string;
  name: string;
  gender: string;
  logo: string;
  categoryName: string | null;
  leagueName: string | null;
}

export interface RoundMatch {
  id: string;
  awayMatch: Match;
  homeMatch: Match;
  teamWinner?: Team | null;
  nextMatchId: string;
}

export interface Round {
  matchesPlayoff: RoundMatch[];
}

interface CuadroPlayoffProps {
  rondas: Round[];
}

//Deprecated using the v3 now, not deleted because maybe cutti is using something else from here
const CuadroPlayoffV2: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  const matches = {
    r16: rondas[3]?.matchesPlayoff || [],
    qf: rondas[2]?.matchesPlayoff || [],
    sf: rondas[1]?.matchesPlayoff || [],
    f: rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} },
  };

  return (
    <>
      <Box className="bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-x-scroll relative h-[950px] w-full">
        {/* Round of 16 - Left */}
        {matches.r16.map((match, i) => (
          <Box
            key={`r16-left-${i}`}
            className="absolute"
            style={{ top: `${i * 110 + 60}px`, left: '100px' }}
          >
            <TeamBox
              homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Quarter-finals - Left */}
        {matches.qf.map((match, i) => (
          <Box
            key={`qf-left-${i}`}
            className="absolute"
            style={{ top: `${i * 220 + 115}px`, left: '350px' }}
          >
            <TeamBox
              homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Semi-finals - Left */}
        {matches.sf.map((match, i) => (
          <Box
            key={`sf-left-${i}`}
            className="absolute"
            style={{ top: `${i * 440 + 225}px`, left: '600px' }}
          >
            <TeamBox
              homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Final */}
        <Box className="absolute" style={{ top: '440px', left: '800px', paddingRight: '100px' }}>
          <FinalTeamBox
            nameHome={matches.f.homeMatch?.homeTeam}
            nameAway={matches.f.homeMatch?.awayTeam}
            resultHome={matches.f.homeMatch?.homeTeamGoals}
            resultAway={matches.f.awayMatch?.homeTeamGoals}
          />
        </Box>
      </Box>
    </>
  );
};

export default CuadroPlayoffV2;
