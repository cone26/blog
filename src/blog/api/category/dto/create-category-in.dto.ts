import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryInDto {
  @ApiProperty()
  title: string;
}
