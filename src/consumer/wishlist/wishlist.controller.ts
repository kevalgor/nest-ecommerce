import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import {
  AddProductToWishlistValidatorPipe,
  WishlistIdValidatorPipe,
} from './validations/validation.pipe';
import { AddProductToWishlistDTO, WishlistIdDTO } from './dtos/wishlist.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('consumer/wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get('/')
  async getWishlistProducts(@User('_id') consumerId: string) {
    try {
      const wishlistProducts =
        await this.wishlistService.getWishlistProducts(consumerId);
      return responseHandler(200, messageConstants.SUCCESS, wishlistProducts);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/')
  async addProductToWishlist(
    @Body(new AddProductToWishlistValidatorPipe())
    addProductToWishlistDTO: AddProductToWishlistDTO,
  ) {
    try {
      await this.wishlistService.addProductToWishlist(addProductToWishlistDTO);
      return responseHandler(
        200,
        messageConstants.PRODUCT_ADDED_TO_WISHLIST,
        true,
      );
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:wishlistId')
  async getWishlistProduct(
    @Param(new WishlistIdValidatorPipe()) wishlistIdDTO: WishlistIdDTO,
    @User('_id') consumerId: string,
  ) {
    try {
      const wishlistProduct = await this.wishlistService.getWishlistProduct(
        wishlistIdDTO,
        consumerId,
      );
      return responseHandler(200, messageConstants.SUCCESS, wishlistProduct);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Delete('/:wishlistId')
  async deleteProductFromWishlist(
    @Param(new WishlistIdValidatorPipe()) wishlistIdDTO: WishlistIdDTO,
  ) {
    try {
      await this.wishlistService.deleteProductFromWishlist(wishlistIdDTO);
      return responseHandler(
        200,
        messageConstants.PRODUCT_DELETED_FROM_WISHLIST,
        true,
      );
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
