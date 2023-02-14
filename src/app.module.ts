import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';
dotenv.config();

const link_db = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER_DB}.njlgau6.mongodb.net/?retryWrites=true&w=majorityyarn`;

@Module({
  imports: [
    MongooseModule.forRoot(link_db, {
      writeConcern: { w: 'majority' },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
