import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAdminProfileDTO, ChangePasswordDTO } from './dtos/account.dto';
import { Admin, AdminDocument } from '../../schemas/admin.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async getAdminProfile(adminId: string): Promise<Admin> {
    const adminProfile = await this.adminModel
      .findOne({
        _id: adminId,
      })
      .select('-password');
    if (!adminProfile) {
      throw new NotFoundException(
        messageConstants.ADMIN_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return adminProfile;
  }

  async updateAdminProfile(
    adminId: string,
    updateAdminProfileDTO: UpdateAdminProfileDTO,
  ): Promise<boolean> {
    const adminProfile = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!adminProfile) {
      throw new NotFoundException(messageConstants.ADMIN_NOT_EXIST);
    }
    await this.adminModel.updateOne({ _id: adminId }, updateAdminProfileDTO);
    return true;
  }

  async changePassword(
    adminId: string,
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<boolean> {
    const admin = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!admin) {
      throw new NotFoundException(messageConstants.ADMIN_NOT_EXIST);
    }
    const isPasswordMatch = admin.comparePassword(
      changePasswordDTO.currentPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(messageConstants.INVALID_CREDENTIALS);
    }
    admin.password = changePasswordDTO.newPassword;
    await admin.save();
    return true;
  }
}
