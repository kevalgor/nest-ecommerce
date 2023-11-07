import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  BuyProductValidatorPipe,
  OrderIdValidatorPipe,
} from './validations/validation.pipe';
import { BuyProductDTO, OrderIdDTO } from './dtos/order.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('consumer/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  async getOrders(@User('_id') consumerId: string) {
    try {
      const orders = await this.orderService.getOrders(consumerId);
      return responseHandler(200, messageConstants.SUCCESS, orders);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/')
  async buyProduct(
    @User('_id') consumerId: string,
    @Body(new BuyProductValidatorPipe())
    buyProductDTO: BuyProductDTO,
  ) {
    try {
      await this.orderService.buyProduct(consumerId, buyProductDTO);
      return responseHandler(200, messageConstants.PRODUCT_PURCHASED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:orderId')
  async getOrder(
    @User('_id') consumerId: string,
    @Param(new OrderIdValidatorPipe())
    orderIdDTO: OrderIdDTO,
  ) {
    try {
      const order = await this.orderService.getOrder(consumerId, orderIdDTO);
      return responseHandler(200, messageConstants.SUCCESS, order);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
