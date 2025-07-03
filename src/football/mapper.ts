import { APIGatewayProxyResult } from 'aws-lambda'

const parseResponse = (
  data: unknown,
  statusCode: number
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(data)
  }
}

export const http = {
  success: (data: unknown) => parseResponse(data, 200),
  notFound: (data: unknown) => parseResponse(data, 404),
  created: (data: unknown) => parseResponse(data, 201),
  badRequest: (data: unknown) => parseResponse(data, 400)
}
