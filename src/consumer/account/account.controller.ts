import { Controller, Get, Body, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import {
  UpdateConsumerProfileValidatorPipe,
  ChangePasswordValidatorPipe,
} from './validations/validation.pipe';
import {
  UpdateConsumerProfileDTO,
  ChangePasswordDTO,
} from './dtos/account.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('consumer/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/profile')
  async getConsumerProfile(@User('_id') consumerId: string) {
    try {
      const consumerProfile =
        await this.accountService.getConsumerProfile(consumerId);
      return responseHandler(200, messageConstants.SUCCESS, consumerProfile);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/profile')
  async updateConsumerProfile(
    @User('_id') consumerId: string,
    @Body(new UpdateConsumerProfileValidatorPipe())
    updateConsumerProfileDTO: UpdateConsumerProfileDTO,
  ) {
    try {
      await this.accountService.updateConsumerProfile(
        consumerId,
        updateConsumerProfileDTO,
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

  @Put('/change-password')
  async changePassword(
    @Body(new ChangePasswordValidatorPipe())
    changePasswordDTO: ChangePasswordDTO,
    @User('_id') consumerId: string,
  ) {
    try {
      await this.accountService.changePassword(consumerId, changePasswordDTO);
      return responseHandler(200, messageConstants.PASSWORD_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
