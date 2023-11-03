import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  ConsumerIdDTO,
  UpdateConsumerInformationDTO,
} from '../dtos/profile.dto';

import {
  consumerIdSchema,
  updateConsumerInformationSchema,
} from './profile.validation';

export class ConsumerIdValidatorPipe implements PipeTransform<ConsumerIdDTO> {
  public transform(value: ConsumerIdDTO): ConsumerIdDTO {
    const result = consumerIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class UpdateConsumerInformationValidatorPipe
  implements PipeTransform<UpdateConsumerInformationDTO>
{
  public transform(
    value: UpdateConsumerInformationDTO,
  ): UpdateConsumerInformationDTO {
    const result = updateConsumerInformationSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
