import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ChangePasswordDTO } from '../dtos/setting.dto';

import { changePasswordSchema } from './setting.validation';

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
