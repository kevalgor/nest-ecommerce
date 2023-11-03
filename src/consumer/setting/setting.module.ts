import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../schemas/consumer.schema';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Consumer', schema: ConsumerSchema }]), // Setup the mongoose module to use the consumer schema
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
