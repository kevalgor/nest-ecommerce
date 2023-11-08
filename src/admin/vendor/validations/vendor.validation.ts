import * as Joi from 'joi';

export const vendorIdSchema = Joi.object({
  vendorId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
