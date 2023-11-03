import * as Joi from 'joi';

export const consumerIdSchema = Joi.object({
  consumerId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const updateConsumerInformationSchema = Joi.object({
  name: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
