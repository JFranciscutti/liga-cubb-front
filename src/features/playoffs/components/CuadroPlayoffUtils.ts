const vertialSpacing = 110;// It's the spacing used to define the progressive vertical distance between each Teambox

export const calculateLeftPosition = (matchIndex: number, roundIndex: number) => {
    const leftOffset = 100 + roundIndex * 250; // Horizontal spacing per rounds
    const spacing = vertialSpacing * Math.pow(2, roundIndex); // Vertical spacing per round
    const topOffset = matchIndex * spacing + spacing / 2 + 5; // Progressive downward position
    return { left: `${leftOffset}px`, top: `${topOffset}px` };
};
  
const getFinalLeftOffset = (leftRoundsLength: number) => {
    return 50 + leftRoundsLength  * 250
}

export const calculateRightPosition = (matchIndex: number, roundIndex: number, leftRoundsLength: number) => {
    const firstRightLeftOffsetStart = getFinalLeftOffset(leftRoundsLength) + 192;// The 192 for the horizontal spacing of the final box
    const leftOffset = firstRightLeftOffsetStart + roundIndex * 250; 
    const adjustedRoundIndex = leftRoundsLength - roundIndex - 1; // Invert the order of the rounds
    const spacing = vertialSpacing * Math.pow(2, adjustedRoundIndex); // Vertical progressive spacing but in reverse
    const topOffset = matchIndex * spacing + spacing / 2 + 5; // Same formula as left side
  
    return { left: `${leftOffset}px`, top: `${topOffset}px`};
};

export const getFinalPosition = (leftRoundsLength: number) => {
    const leftOffset = getFinalLeftOffset(leftRoundsLength); // Center horizontally the final
    const semiTopOffset = vertialSpacing * Math.pow(2, leftRoundsLength -2);
    const topOffset = leftRoundsLength === 0 ? vertialSpacing : semiTopOffset + 158;// if there's only a final then 110 else ...
    return { left: `${leftOffset}px`, top: `${topOffset}px`};
};

export const calculateScreenHeight = (leftRoundsLength: number) => {
    const totalRounds = leftRoundsLength + 1;
    const initialRoundMatches = totalRounds === 1 ? 2 : (totalRounds - 1);
    const matchHeight = 160;

    return initialRoundMatches * matchHeight + matchHeight / 2;
};