import * as service from './service.mjs'
import { http } from './mapper.mjs'
import { createTournamentSchema, updateTournamentSchema } from './schema.mjs'

export const getTournament = async (event) => {
  const { id } = event.pathParameters

  const tournament = await service.getTournament(id)
  if (!tournament) {
    return http.notFound({ message: 'Tournament not found' })
  }

  return http.success(tournament)
}

export const createTournament = async (event) => {
  const { body } = event
  const newTeam = JSON.parse(body)

  const validationResult = createTournamentSchema.validate(newTeam)

  console.info({ validationResult })
  if (validationResult.error) {
    return http.badRequest(validationResult.error.details)
  }

  const result = await service.createTournament(newTeam)
  return http.created(result)
}

export const updateTournament = async (event) => {
  const { id } = event.pathParameters
  const { body } = event
  const updatedTeam = JSON.parse(body)

  const validationResult = updateTournamentSchema.validate(updatedTeam)

  if (validationResult.error) {
    return http.badRequest(validationResult.error.details)
  }

  const result = await service.updateTournament(id, updatedTeam)

  if (!result) {
    return http.notFound({ message: 'Tournament not found' })
  }

  return http.success(result)
}
