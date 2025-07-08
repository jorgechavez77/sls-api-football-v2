import { APIGatewayProxyResult } from 'aws-lambda'
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
  conflict: (data: unknown) => parseResponse(data, 409)
}

export class HttpError extends Error {
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }

  statusCode: number
}
