import * as Joi from 'joi';

export const updateVendorProfileSchema = Joi.object({
  name: Joi.string().trim().optional(),
  mobile: Joi.string().trim().optional(),
  shopAddress: Joi.string().trim().optional(),
}).options({
  abortEarly: true,
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
