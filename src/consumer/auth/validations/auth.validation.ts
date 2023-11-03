import * as Joi from 'joi';

export const consumerSignupSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  deliveryAddress: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const consumerLoginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
