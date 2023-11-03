import * as Joi from 'joi';

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
