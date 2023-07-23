import { ApiProperty } from '@nestjs/swagger';
import { EntitySerializeImpl } from '../../base/entity-serialize.decorator';
import { ExcludeBaseTimeDto } from '../../exclude-base-time.dto';

@EntitySerializeImpl()
export class ContentDto extends ExcludeBaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  active: boolean;

  constructor(partial?: Partial<ContentDto>) {
    super();
    Object.assign(this, partial);
  }
}
