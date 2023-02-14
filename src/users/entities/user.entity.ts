import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  isAdm: boolean;

  constructor(data?: Partial<User>) {
    super();
    this.username = data.username;
    this.password = data.password;
    this.isAdm = data.isAdm;
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
