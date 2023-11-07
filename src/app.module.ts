import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerModule } from './consumer/consumer.module';
import { VendorModule } from './vendor/vendor.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING), // Setup the database
    ConsumerModule, // Add the consumer module
    VendorModule, // Add the vendor module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
