import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../../schemas/consumer.schema';
import { ProductSchema } from '../../schemas/product.schema';
import { CartSchema } from '../../schemas/cart.schema';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Consumer', schema: ConsumerSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Cart', schema: CartSchema },
    ]), // Setup the mongoose module to use the consumer, product and cart schema
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
