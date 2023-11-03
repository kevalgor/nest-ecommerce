import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductIdDTO } from './dtos/product.dto';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel
      .find()
      .populate({ path: 'vendor', select: 'name email mobile shopAddress' });
    return products;
  }

  async getProduct(productIdDTO: ProductIdDTO): Promise<Product> {
    const product = await this.productModel
      .findOne({
        _id: productIdDTO.productId,
      })
      .populate({ path: 'vendor', select: 'name email mobile shopAddress' });
    if (!product) {
      throw new NotFoundException(
        messageConstants.PRODUCT_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return product;
  }
}
