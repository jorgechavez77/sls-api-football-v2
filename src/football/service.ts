import { Document, ObjectId, WithId } from 'mongodb'
import { getConnection } from './mongo.js'
import { Tournament } from './types.js'

export const getTournament = async (
  id: string
): Promise<WithId<Document> | null> => {
  const conn = await getConnection()
  const result = await conn
    .collection('tournaments')
    .findOne({ _id: ObjectId.createFromHexString(id) })
  return result
}

export const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  tournament.createdAt = new Date()
  tournament.updatedAt = new Date()
  const conn = await getConnection()
  await conn.collection('tournaments').insertOne(tournament)
  return tournament
}

export const updateTournament = async (
  id: string,
  tournament: Tournament
): Promise<WithId<Document> | null> => {
  const conn = await getConnection()
  const result = await conn
    .collection('tournaments')
    .findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...tournament, updatedAt: new Date() } }
    )
  return result
}
