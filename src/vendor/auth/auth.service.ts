import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { VendorDocument } from '../../schemas/vendor.schema';
import { VendorSignupDTO, VendorLoginDTO } from './dtos/auth.dto';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Vendor')
    private readonly vendorModel: Model<VendorDocument>,
    private jwtService: JwtService,
  ) {}

  async vendorSignup(vendorSignupDTO: VendorSignupDTO): Promise<boolean> {
    const vendor = await this.vendorModel.findOne({
      email: vendorSignupDTO.email,
    });
    if (vendor) {
      throw new ConflictException(
        messageConstants.VENDOR_ALREADY_EXIST,
        // {
        // cause: new Error(),
        // description: 'CONFLICT',
        // }
      );
    }
    await this.vendorModel.create(vendorSignupDTO);
    return true;
  }

  async vendorLogin(
    vendorLoginDTO: VendorLoginDTO,
  ): Promise<Record<string, string>> {
    const vendor = await this.vendorModel.findOne({
      email: vendorLoginDTO.email,
    });
    if (!vendor) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const isPasswordMatch = vendor.comparePassword(vendorLoginDTO.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const payload = {
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      role: 'vendor',
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_VENDOR_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const result = {
      ...payload,
      token,
    };
    return result;
  }
}
