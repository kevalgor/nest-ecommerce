import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ConsumerIdValidatorPipe,
  UpdateConsumerInformationValidatorPipe,
} from './validations/validation.pipe';
import {
  ConsumerIdDTO,
  UpdateConsumerInformationDTO,
} from './dtos/profile.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';

@Controller('consumer/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:consumerId')
  async getConsumerInformation(
    @Param(new ConsumerIdValidatorPipe()) consumerIdDTO: ConsumerIdDTO,
  ) {
    try {
      const consumerInformation =
        await this.profileService.getConsumerInformation(consumerIdDTO);
      return responseHandler(
        200,
        messageConstants.SUCCESS,
        consumerInformation,
      );
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/:consumerId')
  async updateConsumerInformation(
    @Param(new ConsumerIdValidatorPipe()) consumerIdDTO: ConsumerIdDTO,
    @Body(new UpdateConsumerInformationValidatorPipe())
    updateConsumerInformationDTO: UpdateConsumerInformationDTO,
  ) {
    try {
      await this.profileService.updateConsumerInformation(
        consumerIdDTO,
        updateConsumerInformationDTO,
      );
      return responseHandler(
        200,
        messageConstants.CONSUMER_PROFILE_UPDATED,
        true,
      );
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
