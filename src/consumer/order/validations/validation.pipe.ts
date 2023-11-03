import { PipeTransform, BadRequestException } from '@nestjs/common';

import { BuyProductDTO, OrderIdDTO } from '../dtos/order.dto';

import { buyProductSchema, orderIdSchema } from './order.validation';

export class BuyProductValidatorPipe implements PipeTransform<BuyProductDTO> {
  public transform(value: BuyProductDTO): BuyProductDTO {
    const result = buyProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class OrderIdValidatorPipe implements PipeTransform<OrderIdDTO> {
  public transform(value: OrderIdDTO): OrderIdDTO {
    const result = orderIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
