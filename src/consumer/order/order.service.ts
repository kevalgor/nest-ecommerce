import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyProductDTO, OrderIdDTO } from './dtos/order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { orderStatus } from '../../utils/orderStatus.enum';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getOrders(consumerId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ consumer: consumerId })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: 'name email mobile shopAddress' },
      })
      .populate('consumer');
    return orders;
  }

  async buyProduct(buyProductDTO: BuyProductDTO): Promise<boolean> {
    await this.orderModel.create({
      ...buyProductDTO,
      orderStatus: orderStatus.Purchased,
    });
    return true;
  }

  async getOrder(orderIdDTO: OrderIdDTO, consumerId: string): Promise<Order> {
    const order = await this.orderModel
      .findOne({
        _id: orderIdDTO.orderId,
        consumer: consumerId,
      })
      .populate({
        path: 'product',
        populate: { path: 'vendor', select: 'name email mobile shopAddress' },
      })
      .populate('consumer');
    if (!order) {
      throw new NotFoundException(
        messageConstants.ORDER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return order;
  }
}
