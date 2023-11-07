import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../../schemas/consumer.schema';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Consumer', schema: ConsumerSchema }]), // Setup the mongoose module to use the consumer schema
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
