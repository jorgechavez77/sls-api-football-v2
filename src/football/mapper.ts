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
  notFound: (data: unknown) => parseResponse(data, 404),
  created: (data: unknown) => parseResponse(data, 201),
  badRequest: (data: unknown) => parseResponse(data, 400),
  noContent: () => parseResponse(null, 204)
}
