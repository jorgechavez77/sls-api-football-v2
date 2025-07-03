import { jest, test, expect } from '@jest/globals'
import { getTournament } from '../handler'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
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

  // when
  const response: undefined | APIGatewayProxyResult = await getTournament(event)

  // then
  expect(response?.statusCode).toBe(200)
  expect(response?.body).toBeDefined()
})
