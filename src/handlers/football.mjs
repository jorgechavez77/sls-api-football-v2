import tournament from '../sample/tournaments.json' with { type: 'json' }
import team from '../sample/teams.json' with { type: 'json' }

export const getTournament = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(tournament),
  }
}

export const getTeam = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(team),
  }
}
