import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  AddProductDTO,
  ProductIdDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';

import {
  addProductSchema,
  productIdSchema,
  updateProductSchema,
} from './product.validation';

export class AddProductValidatorPipe implements PipeTransform<AddProductDTO> {
  public transform(value: AddProductDTO): AddProductDTO {
    const result = addProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

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

export class UpdateProductValidatorPipe
  implements PipeTransform<UpdateProductDTO>
{
  public transform(value: UpdateProductDTO): UpdateProductDTO {
    const result = updateProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
