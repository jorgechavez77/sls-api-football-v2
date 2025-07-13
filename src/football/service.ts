import { Collection, ObjectId, WithId } from 'mongodb'
import { getConnection } from './mongo'
import { Fixture, Match, Tournament } from './types'
import { mapMongoDocToJsonObj, httpError } from './mapper'

const getTournamentCollection = (): Promise<Collection<Tournament>> =>
  getConnection().then((e) => e.collection('tournaments'))

export const getTournament = async (id: string): Promise<Tournament> => {
  const collection = await getTournamentCollection()
  const result = await collection.findOne({
    _id: ObjectId.createFromHexString(id)
  })
  if (!result) throw new httpError.NotFound('Tournament not found')
  return mapMongoDocToJsonObj(result)
}

export const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  tournament.status = 'PENDING'
  tournament.createdAt = new Date()
  tournament.updatedAt = new Date()
  const collection = await getTournamentCollection()
  await collection.insertOne(tournament)
  return mapMongoDocToJsonObj(tournament as WithId<Tournament>)
}

export const updateTournament = async (
  id: string,
  tournament: Partial<Tournament>
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

export const initiateTournament = async (
  tournament: Tournament
): Promise<Fixture> => {
  if (tournament.status === 'STARTED')
    throw new httpError.Conflict('Tournament already started')

  const { teams, type } = tournament
  const fixture = generateFixture(teams, type === 'ROUND_ROBIN')
  await updateTournament(tournament.id!, { status: 'STARTED', fixture })
  return fixture
}

export const generateFixture = (
  teams: string[],
  isRound: boolean = false
): Fixture => {
  const fixture: Fixture = {
    matches: []
  }
  const matches: Match[] = []
  if (!isRound) {
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({ homeTeam: teams[i], awayTeam: teams[j] })
      }
    }
  } else {
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i !== j) {
          matches.push({ homeTeam: teams[i], awayTeam: teams[j] })
        }
      }
    }
  }

  const sortedMatches: Match[] = sortFixture(matches)
  fixture.matches = sortedMatches

  return fixture
}

const sortFixture = (matches: Match[]): Match[] => {
  const sortedMatches: Match[] = []
  while (matches.length > 0) {
    const first = matches.shift()
    if (first) sortedMatches.push(first)
    const last = matches.pop()
    if (last) sortedMatches.push(last)
  }
  return sortedMatches
}
