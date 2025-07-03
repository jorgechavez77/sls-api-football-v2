export interface Tournament {
  id?: string
  name: string
  teams: string[]
  createdAt: Date
  updatedAt: Date
}

export interface TournamentBody {
  name: string
  teams: string[]
  createdAt: Date
  updatedAt: Date
}

export interface TournamentResponse extends TournamentBody {
  id: string
}
