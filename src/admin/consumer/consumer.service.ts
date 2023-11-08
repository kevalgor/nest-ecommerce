import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumerIdDTO } from './dtos/consumer.dto';
import { AdminDocument } from '../../schemas/admin.schema';
import { Consumer, ConsumerDocument } from '../../schemas/consumer.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
  ) {}

  async getConsumers(adminId: string): Promise<Consumer[]> {
    const admin = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!admin) {
      throw new NotFoundException(
        messageConstants.ADMIN_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const consumers = await this.consumerModel.find();
    return consumers;
  }

  async getConsumer(
    adminId: string,
    consumerIdDTO: ConsumerIdDTO,
  ): Promise<Consumer> {
    const admin = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!admin) {
      throw new NotFoundException(
        messageConstants.ADMIN_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const consumer = await this.consumerModel.findOne({
      _id: consumerIdDTO.consumerId,
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
    return consumer;
  }
}
