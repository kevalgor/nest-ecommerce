import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { AuthMiddleware, VendorMiddleware } from './middleware/auth.middleware';
import { AccountController } from './account/account.controller';
import { ProductController } from './product/product.controller';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [AuthModule, AccountModule, ProductModule],
})
export class VendorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, VendorMiddleware)
      .forRoutes(AccountController, ProductController);
  }
}
