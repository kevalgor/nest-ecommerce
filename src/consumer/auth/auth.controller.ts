import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConsumerSignupDTO, ConsumerLoginDTO } from './dtos/auth.dto';
import {
  ConsumerSignupValidatorPipe,
  ConsumerLoginValidatorPipe,
} from './validations/validation.pipe';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';

@Controller('consumer/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async consumerSignup(
    @Body(new ConsumerSignupValidatorPipe())
    consumerSignupDTO: ConsumerSignupDTO,
  ) {
    try {
      await this.authService.consumerSignup(consumerSignupDTO);
      return responseHandler(200, messageConstants.SIGNUP_SUCCESS, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/login')
  async consumerLogin(
    @Body(new ConsumerLoginValidatorPipe()) consumerLoginDTO: ConsumerLoginDTO,
  ) {
    try {
      const login = await this.authService.consumerLogin(consumerLoginDTO);
      return responseHandler(200, messageConstants.LOGIN_SUCCESS, login);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
