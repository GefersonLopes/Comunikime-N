import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop({ default: null })
  img: string;
  @Prop()
  amount: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
