import { ApiProperty } from '@nestjs/swagger';

export class CreatePostInDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;
}
