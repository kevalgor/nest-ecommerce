import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import {
  AuthMiddleware,
  ConsumerMiddleware,
} from './middleware/auth.middleware';
import { CartController } from './cart/cart.controller';
import { WishlistController } from './wishlist/wishlist.controller';
import { OrderController } from './order/order.controller';
import { AccountController } from './account/account.controller';

@Module({
  controllers: [ConsumerController],
  providers: [ConsumerService],
  imports: [
    AuthModule,
    AccountModule,
    ProductModule,
    CartModule,
    WishlistModule,
    OrderModule,
  ],
})
export class ConsumerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, ConsumerMiddleware)
      .forRoutes(
        AccountController,
        CartController,
        WishlistController,
        OrderController,
      );
  }
}
