import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddProductDTO,
  ProductIdDTO,
  UpdateProductDTO,
} from './dtos/product.dto';
import { VendorDocument } from '../../schemas/vendor.schema';
import { Product, ProductDocument } from '../../schemas/product.schema';
import { OrderDocument } from '../../schemas/order.schema';
import { messageConstants } from '../../constants/message.constants';
import { orderStatus } from '../../utils/orderStatus.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Vendor')
    private readonly vendorModel: Model<VendorDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Order')
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getProducts(vendorId: string): Promise<Product[]> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const products = await this.productModel.find({
      vendor: vendorId,
      deletedAt: { $eq: null },
    });
    return products;
  }

  async addProduct(
    vendorId: string,
    addProductDTO: AddProductDTO,
  ): Promise<boolean> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const productObj = { vendor: vendorId, ...addProductDTO };
    await this.productModel.create(productObj);
    return true;
  }

  async getProduct(
    vendorId: string,
    productIdDTO: ProductIdDTO,
  ): Promise<Product> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const product = await this.productModel.findOne({
      _id: productIdDTO.productId,
      vendor: vendorId,
      deletedAt: { $eq: null },
    });
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

  async updateProduct(
    vendorId: string,
    productIdDTO: ProductIdDTO,
    updateProductDTO: UpdateProductDTO,
  ): Promise<boolean> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const product = await this.productModel.findOne({
      _id: productIdDTO.productId,
      vendor: vendorId,
      deletedAt: { $eq: null },
    });
    if (!product) {
      throw new NotFoundException(messageConstants.PRODUCT_NOT_EXIST);
    }
    const pendingOrder = await this.orderModel.findOne({
      product: productIdDTO.productId,
      orderStatus: orderStatus.Purchased,
    });
    if (pendingOrder) {
      throw new BadRequestException(messageConstants.BOOKED_ORDER_OF_PRODUCT);
    }
    await this.productModel.updateOne(
      { _id: productIdDTO.productId, vendor: vendorId },
      updateProductDTO,
    );
    return true;
  }

  async deleteProduct(
    vendorId: string,
    productIdDTO: ProductIdDTO,
  ): Promise<boolean> {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      throw new NotFoundException(
        messageConstants.VENDOR_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    const product = await this.productModel.findOne({
      _id: productIdDTO.productId,
      vendor: vendorId,
      deletedAt: { $eq: null },
    });
    if (!product) {
      throw new NotFoundException(messageConstants.PRODUCT_NOT_EXIST);
    }
    const pendingOrder = await this.orderModel.findOne({
      product: productIdDTO.productId,
      orderStatus: orderStatus.Purchased,
    });
    if (pendingOrder) {
      throw new BadRequestException(messageConstants.BOOKED_ORDER_OF_PRODUCT);
    }
    await this.productModel.updateOne(
      {
        _id: productIdDTO.productId,
        vendor: vendorId,
      },
      { deletedAt: Date.now() },
    );
    return true;
  }
}
