import * as Joi from 'joi';

export const adminLoginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
