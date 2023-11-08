import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ConsumerModule } from './consumer/consumer.module';
import { VendorModule } from './vendor/vendor.module';
import { AuthMiddleware, AdminMiddleware } from './middleware/auth.middleware';
import { AccountController } from './account/account.controller';
import { ConsumerController } from './consumer/consumer.controller';
import { VendorController } from './vendor/vendor.controller';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [AuthModule, AccountModule, ConsumerModule, VendorModule],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes(AccountController, ConsumerController, VendorController);
  }
}
