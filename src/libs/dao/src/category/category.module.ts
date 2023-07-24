import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../../common/src/database/typeorm/typeorm-ex.module';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmExModule.forFeature([CategoryRepository], 'blog')],
  exports: [TypeOrmExModule],
})
export class CategoryModule {}
