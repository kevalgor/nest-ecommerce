import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  AddProductValidatorPipe,
  ProductIdValidatorPipe,
  UpdateProductValidatorPipe,
} from './validations/validation.pipe';
import {
  AddProductDTO,
  ProductIdDTO,
  UpdateProductDTO,
} from './dtos/product.dto';
import { responseHandler } from '../../utils/response.handler';
import { messageConstants } from '../../constants/message.constants';
import { User } from '../../utils/userDecorator';

@Controller('vendor/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(@User('_id') vendorId: string) {
    try {
      const products = await this.productService.getProducts(vendorId);
      return responseHandler(200, messageConstants.SUCCESS, products);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/')
  async addProduct(
    @User('_id') vendorId: string,
    @Body(new AddProductValidatorPipe())
    addProductDTO: AddProductDTO,
  ) {
    try {
      await this.productService.addProduct(vendorId, addProductDTO);
      return responseHandler(200, messageConstants.PRODUCT_ADDED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:productId')
  async getProduct(
    @User('_id') vendorId: string,
    @Param(new ProductIdValidatorPipe()) productIdDTO: ProductIdDTO,
  ) {
    try {
      const product = await this.productService.getProduct(
        vendorId,
        productIdDTO,
      );
      return responseHandler(200, messageConstants.SUCCESS, product);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/:productId')
  async updateProduct(
    @User('_id') vendorId: string,
    @Param(new ProductIdValidatorPipe()) productIdDTO: ProductIdDTO,
    @Body(new UpdateProductValidatorPipe())
    updateProductDTO: UpdateProductDTO,
  ) {
    try {
      await this.productService.updateProduct(
        vendorId,
        productIdDTO,
        updateProductDTO,
      );
      return responseHandler(200, messageConstants.PRODUCT_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Delete('/:productId')
  async deleteProduct(
    @User('_id') vendorId: string,
    @Param(new ProductIdValidatorPipe()) productIdDTO: ProductIdDTO,
  ) {
    try {
      await this.productService.deleteProduct(vendorId, productIdDTO);
      return responseHandler(200, messageConstants.PRODUCT_DELETED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
