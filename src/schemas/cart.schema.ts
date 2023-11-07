import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true, collection: 'carts' })
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  })
  consumer: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  quantity: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
