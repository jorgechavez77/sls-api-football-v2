import { v4 as uuidv4 } from 'uuid'
import { Match } from './types'

export const generateMatches = (
  teams: string[],
  isRound: boolean = false
): Match[] => {
  const matches: Match[] = []
  if (!isRound) {
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: uuidv4(),
          status: 'PENDING',
          homeTeam: teams[i],
          awayTeam: teams[j]
        })
      }
    }
  } else {
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i !== j) {
          matches.push({
            id: uuidv4(),
            status: 'PENDING',
            homeTeam: teams[i],
            awayTeam: teams[j]
          })
        }
      }
    }
  }

  return sortFixture(matches)
}

const sortFixture = (matches: Match[]): Match[] => {
  const sortedMatches: Match[] = []
  while (matches.length > 0) {
    const first = matches.shift()
    if (first) sortedMatches.push(first)
    const last = matches.pop()
    if (last) sortedMatches.push(last)
  }
  return sortedMatches
}
