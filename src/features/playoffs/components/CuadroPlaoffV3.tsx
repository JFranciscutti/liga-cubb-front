import React from 'react';
import { Box } from '@mui/material';
import { FinalTeamBox, InvertedTeamBox, TeamBox } from './TeamBox';
import { Moment } from 'moment';
import { calculateLeftPosition, calculateRightPosition, calculateScreenHeight, getFinalPosition } from './CuadroPlayoffUtils';

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
  roundNumber?: number; // Indicates the number of RoundMatch that will have this Round
}

interface CuadroPlayoffProps {
  rondas: Round[];
}

/*
  const matches = {
    r32: rondas[3]?.matchesPlayoff.concat(rondas[3]?.matchesPlayoff || []) || [],
    r16: rondas[3]?.matchesPlayoff || [],
    qf: rondas[2]?.matchesPlayoff || [],
    sf: rondas[1]?.matchesPlayoff || [],
    f: rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} },
  };*/

const CuadroPlayoffV3: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  const finalMatch = rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} }; // At least always will have the final
  const roundsWithoutFinal = rondas
    .slice(1)
    .reverse()
    .map((ronda) => ronda?.matchesPlayoff || []); // Remove the final and reverse

  /**
   * Divide the left brach rounds from the rigth branch rounds
   */
  const divideRounds = (rounds: RoundMatch[][]): { leftRounds: RoundMatch[][]; rightRounds: RoundMatch[][] } => {
    const leftRounds: RoundMatch[][] = [];
    let rightRounds: RoundMatch[][] = [];
    
    rounds.forEach((roundMatches) => {
      const midIndex = Math.ceil(roundMatches.length / 2); // Find the middle point
      leftRounds.push(roundMatches.slice(0, midIndex)); 
      rightRounds.push(roundMatches.slice(midIndex));
    });

    rightRounds = rightRounds.slice().reverse();
    
    return { leftRounds, rightRounds };
  };

  const {leftRounds, rightRounds} = divideRounds(roundsWithoutFinal);

  const screenHeight = calculateScreenHeight(leftRounds.length);
  const screenClassName = `bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-x-scroll overflow-y-scroll relative w-full`;

  return (
    <>
      <Box className={screenClassName} style={{ height: `${screenHeight}px`}}>
        {leftRounds.map((matches, roundIndex) =>
          matches.map((match, matchIndex) => (
            <Box
              key={`round-${roundIndex}-match-${matchIndex}`}
              className="absolute"
              style={calculateLeftPosition(matchIndex, roundIndex)}
            >
              <TeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
                awayTeam={match.homeMatch?.awayTeam}
                resultHomeIda={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.homeMatch?.homeTeamGoals
                    ? match.homeMatch?.homeTeamGoals
                    : 0
                }
                resultHomeVuelta={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
                resultAwayIda={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.homeTeamGoals
                    ? match.awayMatch?.homeTeamGoals
                    : 0
                }
                resultAwayVuelta={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
              />
            </Box>
          ))
        )}

        {finalMatch && (
          <Box className="absolute" style={getFinalPosition(leftRounds.length)}>
            <FinalTeamBox
              nameHome={finalMatch.homeMatch?.homeTeam}
              nameAway={finalMatch.homeMatch?.awayTeam}
              resultHome={finalMatch.homeMatch?.homeTeamGoals}
              resultAway={finalMatch.awayMatch?.homeTeamGoals}
            />
          </Box>
        )}

        {rightRounds.map((matches, roundIndex) =>
          matches.map((match, matchIndex) => (
            <Box
              key={`round-${roundIndex}-match-${matchIndex}`}
              className="absolute"
              style={calculateRightPosition(matchIndex, roundIndex, leftRounds.length)}
            >
              <InvertedTeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
                awayTeam={match.homeMatch?.awayTeam}
                resultHomeIda={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.homeMatch?.homeTeamGoals
                    ? match.homeMatch?.homeTeamGoals
                    : 0
                }
                resultHomeVuelta={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
                resultAwayIda={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.homeTeamGoals
                    ? match.awayMatch?.homeTeamGoals
                    : 0
                }
                resultAwayVuelta={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
              />
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default CuadroPlayoffV3;
