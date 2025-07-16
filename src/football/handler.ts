import * as service from './service'
import { handle, http } from './mapper'
import {
  createTournamentSchema,
  updateTournamentSchema,
  searchTournamentSchema
} from './schema'
import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'

const _getTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { id = '' } = event.pathParameters!

  const tournament = await service.getTournament(id)
  return http.success(tournament)
}

const _createTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { body } = event
  const newTournament = JSON.parse(body || '{}')

  const validationResult = createTournamentSchema.validate(newTournament)
  if (validationResult.error) {
    return http.badRequest(validationResult.error.details)
  }

  const result = await service.createTournament(newTournament)
  return http.created(result)
}

const _updateTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { id = '' } = event.pathParameters!
  const { body } = event
  const updatedTeam = JSON.parse(body!)

  const validationResult = updateTournamentSchema.validate(updatedTeam)
  if (validationResult.error) {
    return http.badRequest(validationResult.error.details)
  }

  const result = await service.updateTournament(id, updatedTeam)
  return http.success(result)
}

const _deleteTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { id = '' } = event.pathParameters!
  const result = await service.deleteTournament(id)

  if (!result) {
    return http.notFound({ message: 'Tournament not found' })
  }

  return http.noContent()
}

const _actionTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { id = '', action = '' } = event.pathParameters!
  const tournament = await service.getTournament(id)

  switch (action) {
    case 'initiate':
      await service.initiateTournament(tournament)
      return http.success({ message: 'Tournament initiated' })
    default:
      return http.badRequest({ message: 'Invalid action' })
  }
}

const _searchTournament = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.queryStringParameters!

  const validationResult = searchTournamentSchema.validate(params)
  if (validationResult.error) {
    return http.badRequest({ message: validationResult.error.message })
  }

  const tournaments = await service.searchTournament(params)
  return http.success({ results: tournaments })
}

export const getTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_getTournament)(event, ctx, cb)

export const createTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_createTournament)(event, ctx, cb)

export const updateTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_updateTournament)(event, ctx, cb)

export const deleteTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_deleteTournament)(event, ctx, cb)

export const actionTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_actionTournament)(event, ctx, cb)

export const searchTournament = async (
  event: APIGatewayEvent,
  ctx: Context,
  cb: APIGatewayProxyCallback
) => handle(_searchTournament)(event, ctx, cb)
