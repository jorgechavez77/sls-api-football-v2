import { jest, test, expect } from '@jest/globals'
import { getTournament } from '../handler'
import { APIGatewayEvent, Context } from 'aws-lambda'
import * as service from '../service'
import { Tournament } from '../types'

jest.mock('../service')

const mockGetTournament = jest.mocked(service.getTournament)

test('should return a valid response', async () => {
  // given
  const event = { pathParameters: { id: '123' } } as unknown as APIGatewayEvent
  mockGetTournament.mockResolvedValue({
    id: '123',
    name: 'World Cup'
  } as Tournament)
  const ctx = {} as Context
  const cb = jest.fn()

  // when
  const response = await getTournament(event, ctx, cb)

  // then
  expect(response?.statusCode).toBe(200)
  expect(response?.body).toBeDefined()
})
