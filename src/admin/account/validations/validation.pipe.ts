import { PipeTransform, BadRequestException } from '@nestjs/common';

import { UpdateAdminProfileDTO, ChangePasswordDTO } from '../dtos/account.dto';

import {
  updateAdminProfileSchema,
  changePasswordSchema,
} from './account.validation';

export class UpdateAdminProfileValidatorPipe
  implements PipeTransform<UpdateAdminProfileDTO>
{
  public transform(value: UpdateAdminProfileDTO): UpdateAdminProfileDTO {
    const result = updateAdminProfileSchema.validate(value);
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
