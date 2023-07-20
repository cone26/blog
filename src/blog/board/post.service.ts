import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../libs/dao/src/post/post.repository';
import * as process from 'process';
import { PostDto } from '../../libs/dao/src/post/dto/post.dto';
import { CreatePostInDto } from './dto/create-post-in.dto';
import { PostEntity } from '../../libs/dao/src/post/post.entity';
import { UpdatePostInDto } from './dto/update-post-in.dto';
import { InternalErrorCode } from '../../libs/common/constants/internal-error-code.constants';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository, process.env.DB_NAME)
    private readonly postRepository: PostRepository,
  ) {}

  async getAllPosts(): Promise<PostDto[]> {
    const result = await this.postRepository.find();

    return result;
  }

  async getPost(id: number): Promise<PostDto> {
    const result = await this.postRepository.findById(id);

    return result;
  }

  async getPostByCategory(category: string): Promise<PostDto[]> {
    const result = await this.postRepository.findByCategory(category);

    return result;
  }

  async createPost(createPostInDto: CreatePostInDto): Promise<PostDto> {
    const post = await this.postRepository.save(
      new PostEntity({ ...createPostInDto }),
    );

    return post;
  }

  async updatePost(
    id: number,
    updatePostInDto: UpdatePostInDto,
  ): Promise<PostDto> {
    const findPost = await this.postRepository.findById(id);

    if (!findPost) {
      throw new InternalServerErrorException(
        InternalErrorCode.POST_NOT_FOUND,
        'POST_NOT_FOUND',
      );
    }
    await this.postRepository.updateById(id, updatePostInDto);
    const updatedPost = await this.postRepository.findById(id);

    return updatedPost;
  }

  async removePost(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new InternalServerErrorException(
        InternalErrorCode.POST_NOT_FOUND,
        'POST_NOT_FOUND',
      );
    }

    await this.postRepository.softDelete(id);
  }
}
