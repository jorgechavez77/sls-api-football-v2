import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { Document, WithId } from 'mongodb'

const parseResponse = (
  data: unknown,
  statusCode: number
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(data)
  }
}

export const mapMongoDocToJsonObj = <T>(doc: WithId<Document>): T => {
  const { _id, ...rest } = doc
  return { id: _id.toString(), ...rest } as T
}

export const http = {
  success: (data: unknown) => parseResponse(data, 200),
  created: (data: unknown) => parseResponse(data, 201),
  noContent: () => parseResponse(null, 204),
  badRequest: (data: unknown) => parseResponse(data, 400),
  notFound: (data: unknown) => parseResponse(data, 404),
  conflict: (data: unknown) => parseResponse(data, 409),
  internalServerError: (data: unknown) => parseResponse(data, 500)
}

export class HttpError extends Error {
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }

  statusCode: number
}

export function handle(fn: APIGatewayProxyHandler) {
  return async function (
    event: APIGatewayEvent,
    ctx: Context,
    cb: APIGatewayProxyCallback
  ) {
    try {
      ctx.callbackWaitsForEmptyEventLoop = false
      const result = await fn(event, ctx, cb)
      return result
    } catch (err) {
      console.error(err)
      const message = (err as Error).message
      return http.internalServerError({ message })
    }
  }
}
