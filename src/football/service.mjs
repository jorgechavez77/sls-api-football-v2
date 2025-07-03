import { ObjectId } from 'mongodb'
import { getConnection } from './mongo.mjs'

export const getTournament = async (id) => {
  const conn = await getConnection()
  const result = await conn
    .collection('tournaments')
    .findOne({ _id: ObjectId.createFromHexString(id) })
  return result
}

export const createTournament = async (tournament) => {
  tournament.createdAt = new Date()
  tournament.updatedAt = new Date()
  const conn = await getConnection()
  await conn.collection('tournaments').insertOne(tournament)
  return tournament
}

export const updateTournament = async (id, tournament) => {
  const conn = await getConnection()
  const result = await conn
    .collection('tournaments')
    .findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...tournament, updatedAt: new Date() } }
    )
  return result
}
