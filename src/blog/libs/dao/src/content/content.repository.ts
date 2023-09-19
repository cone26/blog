import { EntityRepository } from '../../../common/src/database/typeorm/typeorm-ex.decorator';
import { Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryMethodUpdateOptions } from '../../../common/src/database/typeorm/typeorm-ex.module';
import { Content } from './content.entity';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async findById(id: number): Promise<Content> {
    return await this.createQueryBuilder('content')
      .where('content.id=:id', { id: id })
      .getOne();
  }

  async findByCategory(category: number): Promise<Content[]> {
    return await this.createQueryBuilder('content')
      .where('content.category_id=:category', { category: category })
      .getMany();
  }

  async updateById<Entity>(
    id: number,
    values: QueryDeepPartialEntity<Entity>,
    updateOptions?: QueryMethodUpdateOptions,
  ): Promise<UpdateResult> {
    return await this.createQueryBuilder('content')
      .update(Content)
      .set(values)
      .where('content.id=:id', { id: id })
      .execute();
  }
}
