import { EntityRepository } from '../../../common/src/database/typeorm/typeorm-ex.decorator';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findById(id: number): Promise<Category> {
    return await this.createQueryBuilder('category')
      .where('category.id=:id', { id: id })
      .getOne();
  }

  async findByTitle(title: string): Promise<Category> {
    return await this.createQueryBuilder('category')
      .where('category.title=:title', { title: title })
      .getOne();
  }
}
