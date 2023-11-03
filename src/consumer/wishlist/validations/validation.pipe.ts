import { PipeTransform, BadRequestException } from '@nestjs/common';

import { AddProductToWishlistDTO, WishlistIdDTO } from '../dtos/wishlist.dto';

import {
  addProductToWishlistSchema,
  wishlistIdSchema,
} from './wishlist.validation';

export class AddProductToWishlistValidatorPipe
  implements PipeTransform<AddProductToWishlistDTO>
{
  public transform(value: AddProductToWishlistDTO): AddProductToWishlistDTO {
    const result = addProductToWishlistSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class WishlistIdValidatorPipe implements PipeTransform<WishlistIdDTO> {
  public transform(value: WishlistIdDTO): WishlistIdDTO {
    const result = wishlistIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
