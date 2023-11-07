import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UpdateConsumerProfileDTO,
  ChangePasswordDTO,
} from './dtos/account.dto';
import { Consumer, ConsumerDocument } from '../../schemas/consumer.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
  ) {}

  async getConsumerProfile(consumerId: string): Promise<Consumer> {
    const consumerProfile = await this.consumerModel
      .findOne({
        _id: consumerId,
      })
      .select('-password');
    if (!consumerProfile) {
      throw new NotFoundException(
        messageConstants.CONSUMER_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return consumerProfile;
  }

  async updateConsumerProfile(
    consumerId: string,
    updateConsumerProfileDTO: UpdateConsumerProfileDTO,
  ): Promise<boolean> {
    const consumerProfile = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumerProfile) {
      throw new NotFoundException(messageConstants.CONSUMER_NOT_EXIST);
    }
    await this.consumerModel.updateOne(
      { _id: consumerId },
      updateConsumerProfileDTO,
    );
    return true;
  }

  async changePassword(
    consumerId: string,
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<boolean> {
    const consumer = await this.consumerModel.findOne({
      _id: consumerId,
    });
    if (!consumer) {
      throw new NotFoundException(messageConstants.CONSUMER_NOT_EXIST);
    }
    const isPasswordMatch = consumer.comparePassword(
      changePasswordDTO.currentPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(messageConstants.INVALID_CREDENTIALS);
    }
    consumer.password = changePasswordDTO.newPassword;
    await consumer.save();
    return true;
  }
}
