import { Body, Controller, Put } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ChangePasswordValidatorPipe } from './validations/validation.pipe';
import { ChangePasswordDTO } from './dtos/setting.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('consumer/setting')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Put('/:consumerId')
  async changePassword(
    @Body(new ChangePasswordValidatorPipe())
    changePasswordDTO: ChangePasswordDTO,
    @User('_id') consumerId: string,
  ) {
    try {
      await this.settingService.changePassword(consumerId, changePasswordDTO);
      return responseHandler(200, messageConstants.PASSWORD_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
