import * as Joi from 'joi';

export const vendorSignupSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  shopAddress: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const vendorLoginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
