import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  AddCartProductValidatorPipe,
  CartProductIdValidatorPipe,
  UpdateCartProductValidatorPipe,
} from './validations/validation.pipe';
import {
  AddCartProductDTO,
  CartProductIdDTO,
  UpdateCartProductDTO,
} from './dtos/cart.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('consumer/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/')
  async getCartProducts(@User('_id') consumerId: string) {
    try {
      const cartProducts = await this.cartService.getCartProducts(consumerId);
      return responseHandler(200, messageConstants.SUCCESS, cartProducts);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/')
  async addCartProduct(
    @User('_id') consumerId: string,
    @Body(new AddCartProductValidatorPipe())
    addCartProductDTO: AddCartProductDTO,
  ) {
    try {
      await this.cartService.addCartProduct(consumerId, addCartProductDTO);
      return responseHandler(200, messageConstants.CART_PRODUCT_ADDED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:cartProductId')
  async getCartProduct(
    @User('_id') consumerId: string,
    @Param(new CartProductIdValidatorPipe()) cartProductIdDTO: CartProductIdDTO,
  ) {
    try {
      const cartProduct = await this.cartService.getCartProduct(
        consumerId,
        cartProductIdDTO,
      );
      return responseHandler(200, messageConstants.SUCCESS, cartProduct);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/:cartProductId')
  async updateCartProduct(
    @User('_id') consumerId: string,
    @Param(new CartProductIdValidatorPipe()) cartProductIdDTO: CartProductIdDTO,
    @Body(new UpdateCartProductValidatorPipe())
    updateCartProductDTO: UpdateCartProductDTO,
  ) {
    try {
      await this.cartService.updateCartProduct(
        consumerId,
        cartProductIdDTO,
        updateCartProductDTO,
      );
      return responseHandler(200, messageConstants.CART_PRODUCT_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Delete('/:cartProductId')
  async deleteCartProduct(
    @User('_id') consumerId: string,
    @Param(new CartProductIdValidatorPipe()) cartProductIdDTO: CartProductIdDTO,
  ) {
    try {
      await this.cartService.deleteCartProduct(consumerId, cartProductIdDTO);
      return responseHandler(200, messageConstants.CART_PRODUCT_DELETED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
