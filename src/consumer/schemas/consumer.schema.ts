import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type ConsumerDocument = Consumer & Document;

@Schema({ timestamps: true, collection: 'consumers' })
export class Consumer {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  mobile: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  address: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  deliveryAddress: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  // For comparing passwords
  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer);

ConsumerSchema.loadClass(Consumer);
