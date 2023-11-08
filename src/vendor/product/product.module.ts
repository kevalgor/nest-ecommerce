import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from '../../schemas/vendor.schema';
import { ProductSchema } from '../../schemas/product.schema';
import { OrderSchema } from '../../schemas/order.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vendor', schema: VendorSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
    ]), // Setup the mongoose module to use the vendor, product and order schema
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
