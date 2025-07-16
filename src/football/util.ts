import { v4 as uuidv4 } from 'uuid'
import { Fixture, Match } from './types'

export const generateFixture = (
  teams: string[],
  isRound: boolean = false
): Fixture => {
  const fixture: Fixture = {
    matches: []
  }
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

  const sortedMatches: Match[] = sortFixture(matches)
  fixture.matches = sortedMatches

  return fixture
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
