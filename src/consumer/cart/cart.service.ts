import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddCartProductDTO,
  CartProductIdDTO,
  UpdateCartProductDTO,
} from './dtos/cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCartProducts(consumerId: string): Promise<Cart[]> {
    const cartProducts = await this.cartModel
      .find({ consumer: consumerId })
      .populate('product')
      .populate('consumer');
    return cartProducts;
  }

  async addCartProduct(addCartProductDTO: AddCartProductDTO): Promise<boolean> {
    await this.cartModel.create(addCartProductDTO);
    return true;
  }

  async getCartProduct(
    cartProductIdDTO: CartProductIdDTO,
    consumerId: string,
  ): Promise<Cart> {
    const cartProduct = await this.cartModel
      .findOne({
        _id: cartProductIdDTO.cartProductId,
        consumer: consumerId,
      })
      .populate('product')
      .populate('consumer');
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

  async updateCartProductById(
    cartProductIdDTO: CartProductIdDTO,
    updateCartProductDTO: UpdateCartProductDTO,
  ): Promise<boolean> {
    const cartProduct = await this.cartModel.findOne({
      _id: cartProductIdDTO.cartProductId,
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

  async deleteCartProductById(
    cartProductIdDTO: CartProductIdDTO,
  ): Promise<boolean> {
    const cartProduct = await this.cartModel.findOne({
      _id: cartProductIdDTO.cartProductId,
    });
    if (!cartProduct) {
      throw new NotFoundException(messageConstants.CART_PRODUCT_NOT_EXIST);
    }
    await this.cartModel.deleteOne({ _id: cartProductIdDTO.cartProductId });
    return true;
  }
}
