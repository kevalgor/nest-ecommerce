import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schemas/admin.schema';
import { VendorSchema } from '../../schemas/vendor.schema';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'Vendor', schema: VendorSchema },
    ]), // Setup the mongoose module to use the admin and vendor schema
  ],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
