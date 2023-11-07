import * as Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  image: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
  price: Joi.number().required(),
  discount: Joi.number().min(1).max(90).required(),
}).options({
  abortEarly: true,
});

export const productIdSchema = Joi.object({
  productId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  image: Joi.string().trim().optional(),
  category: Joi.string().trim().optional(),
  price: Joi.number().optional(),
  discount: Joi.number().min(1).max(90).optional(),
}).options({
  abortEarly: true,
});
