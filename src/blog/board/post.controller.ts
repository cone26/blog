import { Controller, Get } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { PostDto } from '../../dto/post/dto/post.dto'
import { async } from 'rxjs'

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly boardService: PostService) {}

  // @Get()
  //   summary: 'get all posts',
  //   type
  // })
  // async getAllPosts() {}
}
