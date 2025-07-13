import Joi from 'joi'

export const createTournamentSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('SINGLE', 'ROUND_ROBIN').required(),
  teams: Joi.array().items(Joi.string())
}).unknown(false)

export const updateTournamentSchema = Joi.object({
  name: Joi.string(),
  teams: Joi.array().items(Joi.string())
})
  .unknown(false)
  .min(1)

export const searchTournamentSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid('SINGLE', 'ROUND_ROBIN'),
  status: Joi.string().valid('PENDING', 'STARTED', 'COMPLETED')
})
  .unknown(false)
  .min(1)
