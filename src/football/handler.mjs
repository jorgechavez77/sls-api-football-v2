import tournament from '../sample/tournaments.json' with { type: 'json' }
import * as service from './service.mjs'
import { mapResponse } from './mapper.mjs'
import { createTeamSchema } from './schema.mjs'

export const getTournament = async (event) => {
  const { id } = event.pathParameters

  const tournament = await service.getTournament(id)
  if (!tournament) {
    return mapResponse({ message: 'Team not found' }, 404)
  }

  return mapResponse(tournament)
}

export const getTeam = async (event) => {
  const { id } = event.pathParameters

  const team = await service.getTeam(id)
  if (!team) {
    return mapResponse({ message: 'Team not found' }, 404)
  }

  return mapResponse(team)
}

export const createTeam = async (event) => {
  const { body } = event
  const newTeam = JSON.parse(body)

  const validationResult = createTeamSchema.validate(newTeam)

  if (validationResult.error) {
    return mapResponse(validationResult.error.details, 400)
  }

  const result = await service.createTeam(newTeam)
  return mapResponse(result, 201)
}
