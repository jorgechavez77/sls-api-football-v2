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

export const getTeam = async (id) => {
  const conn = await getConnection()
  const result = await conn
    .collection('teams')
    .findOne({ _id: ObjectId.createFromHexString(id) })
  return result
}

export const createTeam = async (team) => {
  team.createdAt = new Date()
  team.updatedAt = new Date()
  const conn = await getConnection()
  await conn.collection('teams').insertOne(team)
  return team
}
