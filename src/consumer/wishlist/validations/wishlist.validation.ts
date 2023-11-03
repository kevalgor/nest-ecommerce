import * as Joi from 'joi';

export const addProductToWishlistSchema = Joi.object({
  product: Joi.string().trim().required(),
  consumer: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const wishlistIdSchema = Joi.object({
  wishlistId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
