import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI

let cachedDb = null

export async function getConnection() {
  if (cachedDb) {
    console.info('Reused connection')
    return cachedDb
  }
  const client = await MongoClient.connect(MONGODB_URI, { timeoutMS: 10000 })

  const db = client.db('football')
  cachedDb = db
  return db
}
