import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VendorSignupDTO, VendorLoginDTO } from './dtos/auth.dto';
import {
  VendorSignupValidatorPipe,
  VendorLoginValidatorPipe,
} from './validations/validation.pipe';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';

@Controller('vendor/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async vendorSignup(
    @Body(new VendorSignupValidatorPipe())
    vendorSignupDTO: VendorSignupDTO,
  ) {
    try {
      await this.authService.vendorSignup(vendorSignupDTO);
      return responseHandler(200, messageConstants.SIGNUP_SUCCESS, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/login')
  async vendorLogin(
    @Body(new VendorLoginValidatorPipe()) vendorLoginDTO: VendorLoginDTO,
  ) {
    try {
      const login = await this.authService.vendorLogin(vendorLoginDTO);
      return responseHandler(200, messageConstants.LOGIN_SUCCESS, login);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
