import { Controller, Get, Body, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import {
  UpdateVendorProfileValidatorPipe,
  ChangePasswordValidatorPipe,
} from './validations/validation.pipe';
import { UpdateVendorProfileDTO, ChangePasswordDTO } from './dtos/account.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('vendor/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/profile')
  async getVendorProfile(@User('_id') vendorId: string) {
    try {
      const vendorProfile =
        await this.accountService.getVendorProfile(vendorId);
      return responseHandler(200, messageConstants.SUCCESS, vendorProfile);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/profile')
  async updateVendorProfile(
    @User('_id') vendorId: string,
    @Body(new UpdateVendorProfileValidatorPipe())
    updateVendorProfileDTO: UpdateVendorProfileDTO,
  ) {
    try {
      await this.accountService.updateVendorProfile(
        vendorId,
        updateVendorProfileDTO,
      );
      return responseHandler(
        200,
        messageConstants.VENDOR_PROFILE_UPDATED,
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
    @User('_id') vendorId: string,
  ) {
    try {
      await this.accountService.changePassword(vendorId, changePasswordDTO);
      return responseHandler(200, messageConstants.PASSWORD_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
