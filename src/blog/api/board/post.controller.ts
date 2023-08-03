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
import { ContentDto } from '../../libs/dao/src/content/dto/content.dto';
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
    summary: 'get a content by id',
  })
  async getPost(@Param('id') id: number): Promise<ContentDto> {
    return await this.postService.getPost(+id);
  }

  @Get('/find')
  @ApiOperation({
    summary: 'get posts by category',
  })
  async getPostByCategory(
    @Query('category') category: string,
  ): Promise<ContentDto[]> {
    return await this.postService.getPostByCategory(category);
  }

  @Post('/')
  @ApiOperation({
    summary: 'create a content',
  })
  async createPost(
    @Body() createPostInDto: CreatePostInDto,
  ): Promise<ContentDto> {
    return await this.postService.createPost(createPostInDto);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'update a content',
  })
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostInDto: UpdatePostInDto,
  ): Promise<ContentDto> {
    return await this.postService.updatePost(id, updatePostInDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'delete a content',
  })
  async removePost(@Param('id') id: number): Promise<void> {
    await this.postService.removePost(id);
  }
}
