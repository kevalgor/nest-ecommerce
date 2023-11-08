import * as Joi from 'joi';

export const consumerIdSchema = Joi.object({
  consumerId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
