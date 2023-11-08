import { PipeTransform, BadRequestException } from '@nestjs/common';

import { VendorIdDTO } from '../dtos/vendor.dto';

import { vendorIdSchema } from './vendor.validation';

export class VendorIdValidatorPipe implements PipeTransform<VendorIdDTO> {
  public transform(value: VendorIdDTO): VendorIdDTO {
    const result = vendorIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
