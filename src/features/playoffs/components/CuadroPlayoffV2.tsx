import React from 'react';
import { Box } from '@mui/material';
import { Moment } from 'moment';
import { FinalTeamBox, InvertedTeamBox, TeamBox } from './TeamBox';

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

const CuadroPlayoffV2: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  const teams = {
    r16: rondas[3].matchesPlayoff,
    qf: rondas[2].matchesPlayoff,
    sf: rondas[1].matchesPlayoff,
    f: rondas[0].matchesPlayoff[0],
  };

  return (
    <>
      <Box className="bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-auto relative h-[950px] w-[1100px]">
        {/* Round of 16 - Left */}
        {teams.r16.map((match, i) => (
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
        {teams.qf.map((match, i) => (
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
        {teams.sf.map((match, i) => (
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
            nameHome={teams.f.homeMatch?.homeTeam}
            nameAway={teams.f.homeMatch?.awayTeam}
            resultHome={teams.f.homeMatch?.homeTeamGoals}
            resultAway={teams.f.awayMatch?.homeTeamGoals}
          />
        </Box>
      </Box>
    </>
  );
};

export default CuadroPlayoffV2;
