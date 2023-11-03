import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductToWishlistDTO, WishlistIdDTO } from './dtos/wishlist.dto';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Wishlist')
    private readonly wishlistModel: Model<WishlistDocument>,
  ) {}

  async getWishlistProducts(consumerId: string): Promise<Wishlist[]> {
    const wishlistProducts = await this.wishlistModel
      .find({ consumer: consumerId })
      .populate('product');
    return wishlistProducts;
  }

  async addProductToWishlist(
    addProductToWishlistDTO: AddProductToWishlistDTO,
  ): Promise<boolean> {
    await this.wishlistModel.create(addProductToWishlistDTO);
    return true;
  }

  async getWishlistProduct(
    wishlistIdDTO: WishlistIdDTO,
    consumerId: string,
  ): Promise<Wishlist> {
    const wishlistProduct = await this.wishlistModel
      .findOne({
        _id: wishlistIdDTO.wishlistId,
        consumer: consumerId,
      })
      .populate('product');
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
    wishlistIdDTO: WishlistIdDTO,
  ): Promise<boolean> {
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
