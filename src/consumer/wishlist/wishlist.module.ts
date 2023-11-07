import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerSchema } from '../../schemas/consumer.schema';
import { ProductSchema } from '../../schemas/product.schema';
import { WishlistSchema } from '../../schemas/wishlist.schema';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Consumer', schema: ConsumerSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Wishlist', schema: WishlistSchema },
    ]), // Setup the mongoose module to use the wishlist schema
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
