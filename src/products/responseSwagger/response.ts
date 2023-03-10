import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  img: string;
  @ApiProperty()
  _v: number;
}
