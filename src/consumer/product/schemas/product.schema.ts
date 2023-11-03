import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  discount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  })
  vendor: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
