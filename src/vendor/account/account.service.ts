import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateVendorProfileDTO, ChangePasswordDTO } from './dtos/account.dto';
import { Vendor, VendorDocument } from '../../schemas/vendor.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Vendor')
    private readonly vendorModel: Model<VendorDocument>,
  ) {}

  async getVendorProfile(vendorId: string): Promise<Vendor> {
    const vendorProfile = await this.vendorModel
      .findOne({
        _id: vendorId,
      })
      .select('-password');
    if (!vendorProfile) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return vendorProfile;
  }

  async updateVendorProfile(
    vendorId: string,
    updateVendorProfileDTO: UpdateVendorProfileDTO,
  ): Promise<boolean> {
    const vendorProfile = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendorProfile) {
      throw new NotFoundException(messageConstants.VENDOR_NOT_EXIST);
    }
    await this.vendorModel.updateOne({ _id: vendorId }, updateVendorProfileDTO);
    return true;
  }

  async changePassword(
    vendorId: string,
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<boolean> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(messageConstants.VENDOR_NOT_EXIST);
    }
    const isPasswordMatch = vendor.comparePassword(
      changePasswordDTO.currentPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(messageConstants.INVALID_CREDENTIALS);
    }
    vendor.password = changePasswordDTO.newPassword;
    await vendor.save();
    return true;
  }
}
