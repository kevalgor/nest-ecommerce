import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  AddCartProductDTO,
  CartProductIdDTO,
  UpdateCartProductDTO,
} from '../dtos/cart.dto';

import {
  addCartProductSchema,
  cartProductIdSchema,
  updateCartProductSchema,
} from './cart.validation';

export class AddCartProductValidatorPipe
  implements PipeTransform<AddCartProductDTO>
{
  public transform(value: AddCartProductDTO): AddCartProductDTO {
    const result = addCartProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class CartProductIdValidatorPipe
  implements PipeTransform<CartProductIdDTO>
{
  public transform(value: CartProductIdDTO): CartProductIdDTO {
    const result = cartProductIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class UpdateCartProductValidatorPipe
  implements PipeTransform<UpdateCartProductDTO>
{
  public transform(value: UpdateCartProductDTO): UpdateCartProductDTO {
    const result = updateCartProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
