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

class HttpError extends Error {
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }
  statusCode: number
}

class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

class Conflict extends HttpError {
  constructor(message: string) {
    super(message, 409)
    this.name = 'ConflictError'
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500)
    this.name = 'InternalServerError'
  }
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

export const httpError = {
  BadRequest,
  NotFound,
  Conflict,
  InternalServerError
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
      if (err instanceof NotFound) {
        return http.notFound({ message: err.message })
      } else if (err instanceof Conflict) {
        return http.conflict({ message: err.message })
      } else if (err instanceof BadRequest) {
        return http.badRequest({ message: err.message })
      } else {
        const message = (err as Error).message
        return http.internalServerError({ message })
      }
    }
  }
}
