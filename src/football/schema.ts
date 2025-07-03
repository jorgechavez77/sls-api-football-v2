import Joi from 'joi'

export const createTournamentSchema = Joi.object({
  name: Joi.string().required(),
  teams: Joi.array().items(Joi.string())
}).unknown(false)

export const updateTournamentSchema = Joi.object({
  name: Joi.string(),
  teams: Joi.array().items(Joi.string())
})
  .unknown(false)
  .min(1)
