import { EntityRepository } from '../../../common/database/typeorm/typeorm-ex.decorator'
import { Repository } from 'typeorm'
import { Post } from './post.entity'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
