import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../../schemas/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // Setup the mongoose module to use the product schema
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
