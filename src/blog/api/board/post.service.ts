import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from '../../libs/dao/src/content/content.repository';
import { ContentDto } from '../../libs/dao/src/content/dto/content.dto';
import { CreatePostInDto } from './dto/create-post-in.dto';
import { Content } from '../../libs/dao/src/content/content.entity';
import { UpdatePostInDto } from './dto/update-post-in.dto';
import { InternalErrorCode } from '../../libs/common/src/constants/internal-error-code.constants';
import { CategoryRepository } from '../../libs/dao/src/category/category.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(ContentRepository, process.env.DB_NAME)
    private readonly postRepository: ContentRepository,
    @InjectRepository(CategoryRepository, process.env.DB_NAME)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPosts(): Promise<ContentDto[]> {
    const results = await this.postRepository.find();

    return results.map((result) => ContentDto.fromEntity(result));
  }

  async getPost(id: number): Promise<ContentDto> {
    const result = await this.postRepository.findById(id);

    return ContentDto.fromEntity(result);
  }

  async getPostByCategory(category: string): Promise<ContentDto[]> {
    const findCategory = await this.categoryRepository.findByTitle(category);
    console.log(findCategory);
    const result = await this.postRepository.findByCategory(findCategory.id);

    return ContentDto.fromEntity(result);
  }

  async createPost(createPostInDto: CreatePostInDto): Promise<ContentDto> {
    const category = await this.categoryRepository.findByTitle(
      createPostInDto.category,
    );
    const post = await this.postRepository.save(
      new Content({
        ...createPostInDto,
        category: await category,
      }),
    );

    return ContentDto.fromEntity(post);
  }

  async updatePost(
    id: number,
    updatePostInDto: UpdatePostInDto,
  ): Promise<ContentDto> {
    const findPost = await this.postRepository.findById(id);

    if (!findPost) {
      throw new InternalServerErrorException(
        InternalErrorCode.POST_NOT_FOUND,
        'POST_NOT_FOUND',
      );
    }

    const category = await this.categoryRepository.findByTitle(
      updatePostInDto.category,
    );
    await this.postRepository.updateById(id, {
      ...updatePostInDto,
      category: await category,
    });
    const updatedPost = await this.postRepository.findById(id);

    return ContentDto.fromEntity(updatedPost);
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
