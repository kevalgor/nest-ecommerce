import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from '../../schemas/vendor.schema';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]), // Setup the mongoose module to use the vendor schema
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
