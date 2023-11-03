import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ConsumerSignupDTO, ConsumerLoginDTO } from '../dtos/auth.dto';

import { consumerSignupSchema, consumerLoginSchema } from './auth.validation';

export class ConsumerSignupValidatorPipe
  implements PipeTransform<ConsumerSignupDTO>
{
  public transform(value: ConsumerSignupDTO): ConsumerSignupDTO {
    const result = consumerSignupSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class ConsumerLoginValidatorPipe
  implements PipeTransform<ConsumerLoginDTO>
{
  public transform(value: ConsumerLoginDTO): ConsumerLoginDTO {
    const result = consumerLoginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
