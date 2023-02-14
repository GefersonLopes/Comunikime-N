import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(180)
  //Swagger
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  //Swagger
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  //Swagger
  @ApiProperty()
  amount: number;

  //Swagger
  @ApiProperty()
  img: string;
}
