import { test, expect } from '@jest/globals'
import { generateMatches } from '../util'

test('should generate a fixture', () => {
  const teams = ['Team A', 'Team B', 'Team C']
  const fixture = generateMatches(teams, false)
  console.log(fixture)

  expect(fixture).toEqual({
    matches: [
      { homeTeam: 'Team A', awayTeam: 'Team B' },
      { homeTeam: 'Team B', awayTeam: 'Team C' },
      { homeTeam: 'Team A', awayTeam: 'Team C' }
    ]
  })
})
