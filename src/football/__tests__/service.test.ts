import { test, expect } from '@jest/globals'
import { generateFixture } from '../service'

test('should generate a fixture', () => {
  const teams = ['Team A', 'Team B', 'Team C']
  const fixture = generateFixture(teams, false)
  console.log(fixture)

  expect(fixture).toEqual({
    matches: [
      { homeTeam: 'Team A', awayTeam: 'Team B' },
      { homeTeam: 'Team A', awayTeam: 'Team C' },
      { homeTeam: 'Team B', awayTeam: 'Team C' }
    ]
  })
})
