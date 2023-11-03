import * as Joi from 'joi';

export const buyProductSchema = Joi.object({
  product: Joi.string().trim().required(),
  consumer: Joi.string().trim().required(),
  quantity: Joi.number().min(1).max(10).required(),
  deliveryAddress: Joi.string().trim().required(),
  orderAmount: Joi.number().required(),
  discount: Joi.number().required(),
  paidAmount: Joi.number().required(),
}).options({
  abortEarly: true,
});

export const orderIdSchema = Joi.object({
  orderId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
