import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../../common/src/database/typeorm/typeorm-ex.module';
import { ContentRepository } from './content.repository';

@Module({
  imports: [TypeOrmExModule.forFeature([ContentRepository], 'blog')],
  exports: [TypeOrmExModule],
})
export class ContentModule {}
