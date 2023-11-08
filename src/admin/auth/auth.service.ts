import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from '../../schemas/admin.schema';
import { AdminLoginDTO } from './dtos/auth.dto';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async adminLogin(
    adminLoginDTO: AdminLoginDTO,
  ): Promise<Record<string, string>> {
    const admin = await this.adminModel.findOne({
      email: adminLoginDTO.email,
    });
    if (!admin) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const isPasswordMatch = admin.comparePassword(adminLoginDTO.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const payload = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ADMIN_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const result = {
      ...payload,
      token,
    };
    return result;
  }
}
