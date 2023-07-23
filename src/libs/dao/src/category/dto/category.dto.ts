import { ApiProperty } from '@nestjs/swagger';
import { EntitySerializeImpl } from '../../base/entity-serialize.decorator';
import { ExcludeBaseTimeDto } from '../../exclude-base-time.dto';
@EntitySerializeImpl()
export class CategoryDto extends ExcludeBaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(partial?: Partial<CategoryDto>) {
    super();
    Object.assign(this, partial);
  }
}
