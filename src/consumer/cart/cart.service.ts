import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddCartProductDTO,
  CartProductIdDTO,
  UpdateCartProductDTO,
} from './dtos/cart.dto';
import { ConsumerDocument } from '../../schemas/consumer.schema';
import { ProductDocument } from '../../schemas/product.schema';
import { Cart, CartDocument } from '../../schemas/cart.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCartProducts(consumerId: string): Promise<Cart[]> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const cartProducts = await this.cartModel
      .find({ consumer: consumerId })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: '-password' },
      });
    return cartProducts;
  }

  async addCartProduct(
    consumerId: string,
    addCartProductDTO: AddCartProductDTO,
  ): Promise<boolean> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const product = await this.productModel.findOne({
      _id: addCartProductDTO.productId,
      deletedAt: { $eq: null },
    });
    if (!product) {
      throw new NotFoundException(
        messageConstants.PRODUCT_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const cartProductObj = {
      product: addCartProductDTO.productId,
      consumer: consumerId,
      quantity: addCartProductDTO.quantity,
    };
    await this.cartModel.create(cartProductObj);
    return true;
  }

  async getCartProduct(
    consumerId: string,
    cartProductIdDTO: CartProductIdDTO,
  ): Promise<Cart> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const cartProduct = await this.cartModel
      .findOne({
        _id: cartProductIdDTO.cartProductId,
        consumer: consumerId,
      })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: '-password' },
      });
    if (!cartProduct) {
      throw new NotFoundException(
        messageConstants.CART_PRODUCT_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return cartProduct;
  }

  async updateCartProduct(
    consumerId: string,
    cartProductIdDTO: CartProductIdDTO,
    updateCartProductDTO: UpdateCartProductDTO,
  ): Promise<boolean> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const cartProduct = await this.cartModel.findOne({
      _id: cartProductIdDTO.cartProductId,
      consumer: consumerId,
    });
    if (!cartProduct) {
      throw new NotFoundException(messageConstants.CART_PRODUCT_NOT_EXIST);
    }
    await this.cartModel.updateOne(
      { _id: cartProductIdDTO.cartProductId },
      updateCartProductDTO,
    );
    return true;
  }

  async deleteCartProduct(
    consumerId: string,
    cartProductIdDTO: CartProductIdDTO,
  ): Promise<boolean> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const cartProduct = await this.cartModel.findOne({
      _id: cartProductIdDTO.cartProductId,
      consumer: consumerId,
    });
    if (!cartProduct) {
      throw new NotFoundException(messageConstants.CART_PRODUCT_NOT_EXIST);
    }
    await this.cartModel.deleteOne({ _id: cartProductIdDTO.cartProductId });
    return true;
  }
}
