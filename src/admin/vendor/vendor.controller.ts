import { Controller, Get, Param } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorIdValidatorPipe } from './validations/validation.pipe';
import { VendorIdDTO } from './dtos/vendor.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('admin/vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get('/')
  async getVendors(@User('_id') adminId: string) {
    try {
      const vendors = await this.vendorService.getVendors(adminId);
      return responseHandler(200, messageConstants.SUCCESS, vendors);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:vendorId')
  async getVendor(
    @User('_id') adminId: string,
    @Param(new VendorIdValidatorPipe()) vendorIdDTO: VendorIdDTO,
  ) {
    try {
      const vendor = await this.vendorService.getVendor(adminId, vendorIdDTO);
      return responseHandler(200, messageConstants.SUCCESS, vendor);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
