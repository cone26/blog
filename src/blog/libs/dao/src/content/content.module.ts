import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../../common/src/database/typeorm/typeorm-ex.module';
import { ContentRepository } from './content.repository';

@Module({
  imports: [
    TypeOrmExModule.forFeature([ContentRepository], process.env.DB_NAME),
  ],
  exports: [TypeOrmExModule],
})
export class ContentModule {}
