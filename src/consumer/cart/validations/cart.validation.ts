import * as Joi from 'joi';

export const addCartProductSchema = Joi.object({
  productId: Joi.string().trim().required(),
  quantity: Joi.number().min(1).max(10).required(),
}).options({
  abortEarly: true,
});

export const cartProductIdSchema = Joi.object({
  cartProductId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const updateCartProductSchema = Joi.object({
  quantity: Joi.number().min(1).max(10).required(),
}).options({
  abortEarly: true,
});
