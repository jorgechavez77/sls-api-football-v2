export interface Tournament {
  id?: string
  name: string
  status: 'PENDING' | 'STARTED' | 'COMPLETED'
  teams: string[]
  fixture?: Fixture
  createdAt: Date
  updatedAt: Date
}

export interface Fixture {
  matches: Match[]
}

export interface Match {
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
}
