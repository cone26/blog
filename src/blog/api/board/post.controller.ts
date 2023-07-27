import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentDto } from '../../libs/dao/src/post/dto/content.dto';
import { CreatePostInDto } from './dto/create-post-in.dto';
import { UpdatePostInDto } from './dto/update-post-in.dto';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @ApiOperation({
    summary: 'get all posts',
  })
  async getAllPosts(): Promise<ContentDto[]> {
    return await this.postService.getAllPosts();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'get a post by id',
  })
  async getPost(@Param('id') id: number): Promise<ContentDto> {
    return await this.postService.getPost(+id);
  }

  @Get('/find')
  async getPostByCategory(
    @Query('category') category: string,
  ): Promise<ContentDto[]> {
    return await this.postService.getPostByCategory(category);
  }

  @Post('/')
  async createPost(
    @Body() createPostInDto: CreatePostInDto,
  ): Promise<ContentDto> {
    return await this.postService.createPost(createPostInDto);
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostInDto: UpdatePostInDto,
  ): Promise<ContentDto> {
    return await this.postService.updatePost(id, updatePostInDto);
  }

  @Delete('/:id')
  async removePost(@Param('id') id: number): Promise<void> {
    await this.postService.removePost(id);
  }
}
