const parseResponse = (data, statusCode) => {
  return {
    statusCode,
    body: JSON.stringify(data)
  }
}

export const http = {
  success: (data) => parseResponse(data, 200),
  notFound: (data) => parseResponse(data, 404),
  created: (data) => parseResponse(data, 201),
  badRequest: (data) => parseResponse(data, 400)
}
