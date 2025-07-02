import Joi from 'joi'

export const createTournamentSchema = Joi.object({
  name: Joi.string().required(),
  teams: Joi.array(),
  matches: Joi.array(),
}).unknown(false)

export const createTeamSchema = Joi.object({
  name: Joi.string().required(),
}).unknown(false)
