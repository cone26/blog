import { EntityRepository } from '../../../common/database/typeorm/typeorm-ex.decorator';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
