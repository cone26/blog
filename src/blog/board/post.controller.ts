import { Controller, Get, Param } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { PostDto } from '../../libs/dao/src/post/dto/post.dto'

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'get all posts'
  })
  async getAllPosts(): Promise<PostDto[]> {
    const posts = await this.postService.getAllPosts()

    return posts
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'get a post by id'
  })
  async getPost(@Param('id') id: number): Promise<PostDto> {
    const post = await this.postService.getPost(+id)

    return
  }
}
