import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  _v: number;
}
