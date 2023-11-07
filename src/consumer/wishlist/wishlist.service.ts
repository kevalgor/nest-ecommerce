import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductToWishlistDTO, WishlistIdDTO } from './dtos/wishlist.dto';
import { ConsumerDocument } from '../../schemas/consumer.schema';
import { ProductDocument } from '../../schemas/product.schema';
import { Wishlist, WishlistDocument } from '../../schemas/wishlist.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Wishlist')
    private readonly wishlistModel: Model<WishlistDocument>,
  ) {}

  async getWishlistProducts(consumerId: string): Promise<Wishlist[]> {
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
    const wishlistProducts = await this.wishlistModel
      .find({ consumer: consumerId })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: '-password' },
      });
    return wishlistProducts;
  }

  async addProductToWishlist(
    consumerId: string,
    addProductToWishlistDTO: AddProductToWishlistDTO,
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
      _id: addProductToWishlistDTO.productId,
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
    const wishlistObj = {
      product: addProductToWishlistDTO.productId,
      consumer: consumerId,
    };
    await this.wishlistModel.create(wishlistObj);
    return true;
  }

  async getWishlistProduct(
    consumerId: string,
    wishlistIdDTO: WishlistIdDTO,
  ): Promise<Wishlist> {
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
    const wishlistProduct = await this.wishlistModel
      .findOne({
        _id: wishlistIdDTO.wishlistId,
        consumer: consumerId,
      })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: '-password' },
      });
    if (!wishlistProduct) {
      throw new NotFoundException(
        messageConstants.WISHLIST_PRODUCT_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return wishlistProduct;
  }

  async deleteProductFromWishlist(
    consumerId: string,
    wishlistIdDTO: WishlistIdDTO,
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
    const wishlistProduct = await this.wishlistModel.findOne({
      _id: wishlistIdDTO.wishlistId,
    });
    if (!wishlistProduct) {
      throw new NotFoundException(messageConstants.WISHLIST_PRODUCT_NOT_EXIST);
    }
    await this.wishlistModel.deleteOne({ _id: wishlistIdDTO.wishlistId });
    return true;
  }
}
