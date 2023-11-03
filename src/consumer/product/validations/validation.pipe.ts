import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ProductIdDTO } from '../dtos/product.dto';

import { productIdSchema } from './product.validation';

export class ProductIdValidatorPipe implements PipeTransform<ProductIdDTO> {
  public transform(value: ProductIdDTO): ProductIdDTO {
    const result = productIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
