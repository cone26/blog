import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '../../libs/dao/src/post/post.repository'
import * as process from 'process'
import { PostDto } from '../../libs/dao/src/post/dto/post.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository, process.env.DB_NAME)
    private readonly postRepository: PostRepository
  ) {}

  async getAllPosts(): Promise<PostDto[]> {
    const result = await this.postRepository.find()

    return result
  }

  async getPost(id: number): Promise<PostDto> {
    const result = await this.postRepository.findById(id)

    return result
  }
}
