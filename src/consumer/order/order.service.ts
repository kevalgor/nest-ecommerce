import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyProductDTO, OrderIdDTO } from './dtos/order.dto';
import { ConsumerDocument } from '../../schemas/consumer.schema';
import { ProductDocument } from '../../schemas/product.schema';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { orderStatus } from '../../utils/orderStatus.enum';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getOrders(consumerId: string): Promise<Order[]> {
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
    const orders = await this.orderModel
      .find({ consumer: consumerId })
      .populate({
        path: 'product',
        select: '-price -discount',
        populate: { path: 'vendor', select: 'name email mobile shopAddress' },
      });
    return orders;
  }

  async buyProduct(
    consumerId: string,
    buyProductDTO: BuyProductDTO,
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
      _id: buyProductDTO.product,
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
    const orderObj = {
      consumer: consumerId,
      ...buyProductDTO,
      orderStatus: orderStatus.Purchased,
    };
    await this.orderModel.create(orderObj);
    return true;
  }

  async getOrder(consumerId: string, orderIdDTO: OrderIdDTO): Promise<Order> {
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
    const order = await this.orderModel
      .findOne({
        _id: orderIdDTO.orderId,
        consumer: consumerId,
      })
      .populate({
        path: 'product',
        select: '-price -discount',
        populate: { path: 'vendor', select: 'name email mobile shopAddress' },
      });
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
