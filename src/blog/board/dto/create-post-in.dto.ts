import { ApiProperty } from '@nestjs/swagger';

export class CreatePostInDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;
}
