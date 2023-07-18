import { EntityRepository } from '../../../common/database/typeorm/typeorm-ex.decorator'
import { Repository } from 'typeorm'
import { Post } from './post.entity'
import { PostDto } from './dto/post.dto'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findById(id: number): Promise<Post> {
    return await this.createQueryBuilder('post').where('id=:id', { id: id }).getOne()
  }
}
