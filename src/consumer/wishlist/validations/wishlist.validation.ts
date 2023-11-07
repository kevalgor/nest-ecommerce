import * as Joi from 'joi';

export const addProductToWishlistSchema = Joi.object({
  productId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const wishlistIdSchema = Joi.object({
  wishlistId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
