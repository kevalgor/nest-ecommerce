import { Controller, Get, Param } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerIdValidatorPipe } from './validations/validation.pipe';
import { ConsumerIdDTO } from './dtos/consumer.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('admin/consumer')
export class ConsumerController {
  constructor(private consumerService: ConsumerService) {}

  @Get('/')
  async getConsumers(@User('_id') adminId: string) {
    try {
      const consumers = await this.consumerService.getConsumers(adminId);
      return responseHandler(200, messageConstants.SUCCESS, consumers);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:consumerId')
  async getConsumer(
    @User('_id') adminId: string,
    @Param(new ConsumerIdValidatorPipe()) consumerIdDTO: ConsumerIdDTO,
  ) {
    try {
      const consumer = await this.consumerService.getConsumer(
        adminId,
        consumerIdDTO,
      );
      return responseHandler(200, messageConstants.SUCCESS, consumer);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
