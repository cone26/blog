import { ApiProperty } from '@nestjs/swagger'

export class PostDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string
}
