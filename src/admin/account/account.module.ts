import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schemas/admin.schema';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]), // Setup the mongoose module to use the admin schema
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
