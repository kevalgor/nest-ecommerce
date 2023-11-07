import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, collection: 'orders' })
export class Order {
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

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  orderStatus: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  orderAmount: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  discount: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  paidAmount: number;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  deliveryAddress: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
