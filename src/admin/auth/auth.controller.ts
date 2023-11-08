import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDTO } from './dtos/auth.dto';
import { AdminLoginValidatorPipe } from './validations/validation.pipe';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async adminLogin(
    @Body(new AdminLoginValidatorPipe()) adminLoginDTO: AdminLoginDTO,
  ) {
    try {
      const login = await this.authService.adminLogin(adminLoginDTO);
      return responseHandler(200, messageConstants.LOGIN_SUCCESS, login);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
