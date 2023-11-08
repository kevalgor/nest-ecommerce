import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../../schemas/consumer.schema';
import { ProductSchema } from '../../schemas/product.schema';
import { OrderSchema } from '../../schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Consumer', schema: ConsumerSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
    ]), // Setup the mongoose module to use the consumer, product and order schema
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
