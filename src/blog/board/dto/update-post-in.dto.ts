import { PartialType } from '@nestjs/swagger';
import { CreatePostInDto } from './create-post-in.dto';

export class UpdatePostInDto extends PartialType(CreatePostInDto) {}
