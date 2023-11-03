import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumerDocument } from '../schemas/consumer.schema';
import { ChangePasswordDTO } from './dtos/setting.dto';
import { messageConstants } from 'src/constants/message.constants';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
  ) {}
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
    await this.consumerModel.updateOne(
      { _id: consumerId },
      { password: changePasswordDTO.newPassword },
    );
    return true;
  }
}
