import { Controller, Get, Body, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import {
  UpdateAdminProfileValidatorPipe,
  ChangePasswordValidatorPipe,
} from './validations/validation.pipe';
import { UpdateAdminProfileDTO, ChangePasswordDTO } from './dtos/account.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('admin/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/profile')
  async getAdminProfile(@User('_id') adminId: string) {
    try {
      const adminProfile = await this.accountService.getAdminProfile(adminId);
      return responseHandler(200, messageConstants.SUCCESS, adminProfile);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/profile')
  async updateAdminProfile(
    @User('_id') adminId: string,
    @Body(new UpdateAdminProfileValidatorPipe())
    updateAdminProfileDTO: UpdateAdminProfileDTO,
  ) {
    try {
      await this.accountService.updateAdminProfile(
        adminId,
        updateAdminProfileDTO,
      );
      return responseHandler(200, messageConstants.ADMIN_PROFILE_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/change-password')
  async changePassword(
    @Body(new ChangePasswordValidatorPipe())
    changePasswordDTO: ChangePasswordDTO,
    @User('_id') adminId: string,
  ) {
    try {
      await this.accountService.changePassword(adminId, changePasswordDTO);
      return responseHandler(200, messageConstants.PASSWORD_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
