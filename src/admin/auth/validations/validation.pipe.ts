import { PipeTransform, BadRequestException } from '@nestjs/common';

import { AdminLoginDTO } from '../dtos/auth.dto';

import { adminLoginSchema } from './auth.validation';

export class AdminLoginValidatorPipe implements PipeTransform<AdminLoginDTO> {
  public transform(value: AdminLoginDTO): AdminLoginDTO {
    const result = adminLoginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
