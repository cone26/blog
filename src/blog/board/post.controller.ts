import { Controller, Get } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly boardService: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'get all posts'
  })
  async getAllPosts() {}
}
