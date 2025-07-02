export const mapResponse = (data, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  }
}
