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

  constructor(data?: Partial<Product>) {
    super();
    this.name = data.name;
    this.price = data.price;
  }
}
export const ProductSchema = SchemaFactory.createForClass(Product);
