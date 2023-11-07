import { PipeTransform, BadRequestException } from '@nestjs/common';

import { VendorSignupDTO, VendorLoginDTO } from '../dtos/auth.dto';

import { vendorSignupSchema, vendorLoginSchema } from './auth.validation';

export class VendorSignupValidatorPipe
  implements PipeTransform<VendorSignupDTO>
{
  public transform(value: VendorSignupDTO): VendorSignupDTO {
    const result = vendorSignupSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class VendorLoginValidatorPipe implements PipeTransform<VendorLoginDTO> {
  public transform(value: VendorLoginDTO): VendorLoginDTO {
    const result = vendorLoginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
