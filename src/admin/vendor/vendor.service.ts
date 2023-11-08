import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorIdDTO } from './dtos/vendor.dto';
import { AdminDocument } from '../../schemas/admin.schema';
import { Vendor, VendorDocument } from '../../schemas/vendor.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel('Vendor')
    private readonly vendorModel: Model<VendorDocument>,
  ) {}

  async getVendors(adminId: string): Promise<Vendor[]> {
    const admin = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!admin) {
      throw new NotFoundException(
        messageConstants.ADMIN_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const vendors = await this.vendorModel.find();
    return vendors;
  }

  async getVendor(adminId: string, vendorIdDTO: VendorIdDTO): Promise<Vendor> {
    const admin = await this.adminModel.findOne({
      _id: adminId,
    });
    if (!admin) {
      throw new NotFoundException(
        messageConstants.ADMIN_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const vendor = await this.vendorModel.findOne({
      _id: vendorIdDTO.vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return vendor;
  }
}
