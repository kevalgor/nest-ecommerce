import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductIdValidatorPipe } from './validations/validation.pipe';
import { ProductIdDTO } from './dtos/product.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';

@Controller('consumer/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts() {
    try {
      const products = await this.productService.getProducts();
      return responseHandler(200, messageConstants.SUCCESS, products);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:productId')
  async getProduct(
    @Param(new ProductIdValidatorPipe()) productIdDTO: ProductIdDTO,
  ) {
    try {
      const product = await this.productService.getProduct(productIdDTO);
      return responseHandler(200, messageConstants.SUCCESS, product);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
