import { PipeTransform, BadRequestException } from '@nestjs/common';

import { UpdateVendorProfileDTO, ChangePasswordDTO } from '../dtos/account.dto';

import {
  updateVendorProfileSchema,
  changePasswordSchema,
} from './account.validation';

export class UpdateVendorProfileValidatorPipe
  implements PipeTransform<UpdateVendorProfileDTO>
{
  public transform(value: UpdateVendorProfileDTO): UpdateVendorProfileDTO {
    const result = updateVendorProfileSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class ChangePasswordValidatorPipe
  implements PipeTransform<ChangePasswordDTO>
{
  public transform(value: ChangePasswordDTO): ChangePasswordDTO {
    const result = changePasswordSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
