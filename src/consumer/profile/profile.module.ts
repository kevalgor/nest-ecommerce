import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../schemas/consumer.schema';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Consumer', schema: ConsumerSchema }]), // Setup the mongoose module to use the consumer schema
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
