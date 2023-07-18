import { Module } from '@nestjs/common'
import { TypeOrmExModule } from '../../../common/database/typeorm/typeorm-ex.module'
import { PostRepository } from './post.repository'

@Module({
  imports: [TypeOrmExModule.forFeature([PostRepository], 'blog')],
  exports: [TypeOrmExModule]
})
export class PostModule {}
