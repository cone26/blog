import { EntityRepository } from '../../../common/database/typeorm/typeorm-ex.decorator';
import { Repository, UpdateResult } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryMethodUpdateOptions } from '../../../common/database/typeorm/typeorm-ex.module';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findById(id: number): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .where('id=:id', { id: id })
      .getOne();
  }

  async findByCategory(category: string): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .where('category=:category', { category: category })
      .getMany();
  }

  async updateById<Entity>(
    id: number,
    values: QueryDeepPartialEntity<Entity>,
    updateOptions?: QueryMethodUpdateOptions,
  ): Promise<UpdateResult> {
    return await this.createQueryBuilder('post')
      .update(PostEntity)
      .set(values)
      .where('post.id=:id', { id: id })
      .execute();
  }
}
