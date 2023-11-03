import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConsumerIdDTO,
  UpdateConsumerInformationDTO,
} from './dtos/profile.dto';
import { Consumer, ConsumerDocument } from '../schemas/consumer.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
  ) {}

  async getConsumerInformation(
    consumerIdDTO: ConsumerIdDTO,
  ): Promise<Consumer> {
    const consumerInformation = await this.consumerModel
      .findOne({
        _id: consumerIdDTO.consumerId,
      })
      .select('-password');
    if (!consumerInformation) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return consumerInformation;
  }

  async updateConsumerInformation(
    consumerIdDTO: ConsumerIdDTO,
    updateConsumerInformationDTO: UpdateConsumerInformationDTO,
  ): Promise<boolean> {
    const consumerInformation = await this.consumerModel.findOne({
      _id: consumerIdDTO.consumerId,
    });
    if (!consumerInformation) {
      throw new NotFoundException(messageConstants.CONSUMER_NOT_EXIST);
    }
    await this.consumerModel.updateOne(
      { _id: consumerIdDTO.consumerId },
      updateConsumerInformationDTO,
    );
    return true;
  }
}
