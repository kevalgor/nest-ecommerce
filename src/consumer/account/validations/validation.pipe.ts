import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  UpdateConsumerProfileDTO,
  ChangePasswordDTO,
} from '../dtos/account.dto';

import {
  updateConsumerProfileSchema,
  changePasswordSchema,
} from './account.validation';

export class UpdateConsumerProfileValidatorPipe
  implements PipeTransform<UpdateConsumerProfileDTO>
{
  public transform(value: UpdateConsumerProfileDTO): UpdateConsumerProfileDTO {
    const result = updateConsumerProfileSchema.validate(value);
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
