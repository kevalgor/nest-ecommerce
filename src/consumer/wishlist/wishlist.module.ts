import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistSchema } from './schemas/wishlist.schema';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wishlist', schema: WishlistSchema }]), // Setup the mongoose module to use the wishlist schema
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
