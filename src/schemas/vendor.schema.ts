import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type VendorDocument = Vendor & Document;

@Schema({ timestamps: true, collection: 'vendors' })
export class Vendor {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  mobile: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shopAddress: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  // For comparing passwords
  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

VendorSchema.loadClass(Vendor);
