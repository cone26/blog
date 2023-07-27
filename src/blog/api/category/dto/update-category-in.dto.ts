import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInDto } from './create-category-in.dto';

export class UpdateCategoryInDto extends PartialType(CreateCategoryInDto) {}
