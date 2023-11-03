import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConsumerDocument } from '../schemas/consumer.schema';
import { ConsumerLoginDTO, ConsumerSignupDTO } from './dtos/auth.dto';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
    private jwtService: JwtService,
  ) {}

  async consumerSignup(consumerSignupDTO: ConsumerSignupDTO): Promise<boolean> {
    const consumer = await this.consumerModel.findOne({
      email: consumerSignupDTO.email,
    });
    if (consumer) {
      throw new ConflictException(
        messageConstants.CONSUMER_ALREADY_EXIST,
        // {
        // cause: new Error(),
        // description: 'CONFLICT',
        // }
      );
    }
    await this.consumerModel.create(consumerSignupDTO);
    return true;
  }

  async consumerLogin(
    consumerLoginDTO: ConsumerLoginDTO,
  ): Promise<Record<string, string>> {
    const consumer = await this.consumerModel.findOne({
      email: consumerLoginDTO.email,
    });
    if (!consumer) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const isPasswordMatch = consumer.comparePassword(consumerLoginDTO.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const payload = {
      _id: consumer._id,
      name: consumer.name,
      email: consumer.email,
      role: 'consumer',
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const result = {
      ...payload,
      token,
    };
    return result;
  }
}
