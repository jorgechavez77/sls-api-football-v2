export interface Tournament {
  id?: string
  name: string
  status: 'PENDING' | 'STARTED' | 'COMPLETED'
  type: 'SINGLE' | 'ROUND_ROBIN'
  teams: string[]
  fixture?: Fixture
  createdAt: Date
  updatedAt: Date
}

export interface Fixture {
  matches: Match[]
}

export interface Match {
  id: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
}
