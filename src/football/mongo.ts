import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!

let cachedDb: Db | null = null

export async function getConnection(): Promise<Db> {
  if (cachedDb) {
    console.info('Reused connection')
    return cachedDb
  }
  const client = await MongoClient.connect(MONGODB_URI)

  const db = client.db('football')
  cachedDb = db
  return db
}
