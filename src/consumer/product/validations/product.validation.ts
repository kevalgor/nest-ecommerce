import * as Joi from 'joi';

export const productIdSchema = Joi.object({
  productId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
