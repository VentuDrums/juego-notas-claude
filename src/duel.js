export function newRound() {
  return { winner: null, blocked: { red: false, blue: false } };
}

export function answerRound(round, team, correct) {
  if (round.winner || round.blocked[team]) return round;
  return correct ? { ...round, winner: team } : { ...round, blocked: { ...round.blocked, [team]: true } };
}

export function isRoundOver(round) {
  return round.winner !== null || (round.blocked.red && round.blocked.blue);
}

export function newMatch(rounds) {
  return { rounds, played: 0, score: { red: 0, blue: 0 } };
}

export function endRound(match, round) {
  const score = { ...match.score };
  if (round.winner) score[round.winner] += 1;
  return { ...match, played: match.played + 1, score };
}

export function isMatchOver(match) {
  return match.played >= match.rounds;
}

export function matchWinner({ score }) {
  if (score.red === score.blue) return null;
  return score.red > score.blue ? 'red' : 'blue';
}
