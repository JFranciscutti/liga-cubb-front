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
  roundNumber?: number;// Indicates the number of RoundMatch that will have this Round
}

interface CuadroPlayoffProps {
  rondas: Round[];
}

const CuadroPlayoffV3: React.FC<CuadroPlayoffProps> = ({ rondas }) => {

    const finalMatch = rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} }; // At least always will have the final
    const otherRounds = rondas.slice(1).reverse().map((ronda) => ronda?.matchesPlayoff || []); // Remove the final and reverse
    const otherRounds2 = otherRounds.slice(1);

    const matches = {
        r32: rondas[3]?.matchesPlayoff.concat(rondas[3]?.matchesPlayoff || []) || [],
        r16: rondas[3]?.matchesPlayoff || [],
        qf: rondas[2]?.matchesPlayoff || [],
        sf: rondas[1]?.matchesPlayoff || [],
        f: rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} },
    };

    const calculatePosition = (matchIndex: number, roundIndex: number) => {
        const leftOffset = 100 + (roundIndex * 250); // Adjust horizontal space between rounds
        const initialTopPos = 110 * Math.pow(2, roundIndex);
        const midTopCalculatedPos = (initialTopPos / 2) + 5;
        const topOffset = (matchIndex * initialTopPos) + midTopCalculatedPos; // Dynamic vertical spacing based on round and match
        return { left: `${leftOffset}px`, top: `${topOffset}px` };
    };

    const totalRounds = otherRounds.length + 1;
    const getFinalPosition = () => {
        const leftOffset = 100 + ((totalRounds - 1) * 250); // Horizontal space based on number of rounds
        const topOffset = (totalRounds === 1) ? 110 : 110 * Math.pow(2, totalRounds - 2);
        return { left: `${leftOffset}px`, top: `${topOffset}px`, paddingRight: '100px' };
    };

    const calculateScreenHeight = () => {
        const initialRoundMatches = Math.pow(2, totalRounds - 1);
        const matchHeight = 81;

        return initialRoundMatches * matchHeight + (matchHeight / 2);
    }

    const screenHeight = calculateScreenHeight();
    const screenClassName = `bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-x-scroll overflow-y-scroll relative h-[${screenHeight}px] w-full`;
    console.log(screenHeight);

    return (
        <>
        <Box className={screenClassName}>
            {otherRounds.map((matches, roundIndex) =>
            matches.map((match, matchIndex) => (
                <Box
                    key={`round-${roundIndex}-match-${matchIndex}`}
                    className="absolute"
                    style={calculatePosition(matchIndex, roundIndex)}
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
            ))
        )}

        {finalMatch && (
            <Box className="absolute" style={getFinalPosition()}>
            <FinalTeamBox
                nameHome={finalMatch.homeMatch?.homeTeam}
                nameAway={finalMatch.homeMatch?.awayTeam}
                resultHome={finalMatch.homeMatch?.homeTeamGoals}
                resultAway={finalMatch.awayMatch?.homeTeamGoals}
            />
            </Box>
        )}
        </Box>
        </>
    );
};

export default CuadroPlayoffV3;
