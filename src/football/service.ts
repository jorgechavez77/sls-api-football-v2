import { Collection, ObjectId, WithId } from 'mongodb'
import { getConnection } from './mongo'
import { Tournament } from './types'
import { mapMongoDocToJsonObj } from './mapper'

const getTournamentCollection = (): Promise<Collection<Tournament>> =>
  getConnection().then((e) => e.collection('tournaments'))

export const getTournament = async (id: string): Promise<Tournament | null> => {
  const collection = await getTournamentCollection()
  const result = await collection.findOne({
    _id: ObjectId.createFromHexString(id)
  })
  if (!result) return null
  return mapMongoDocToJsonObj(result)
}

export const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  tournament.createdAt = new Date()
  tournament.updatedAt = new Date()
  const collection = await getTournamentCollection()
  await collection.insertOne(tournament)
  return mapMongoDocToJsonObj(tournament as WithId<Tournament>)
}

export const updateTournament = async (
  id: string,
  tournament: Tournament
): Promise<Tournament | null> => {
  const collection = await getTournamentCollection()
  const result = await collection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    { $set: { ...tournament, updatedAt: new Date() } },
    { returnDocument: 'after' }
  )
  if (!result) return null
  return mapMongoDocToJsonObj(result)
}

export const deleteTournament = async (id: string): Promise<boolean> => {
  const collection = await getTournamentCollection()
  const result = await collection.deleteOne({
    _id: ObjectId.createFromHexString(id)
  })
  return result.deletedCount === 1
}
