import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ConsumerIdDTO } from '../dtos/consumer.dto';

import { consumerIdSchema } from './consumer.validation';

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
