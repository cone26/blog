import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './blog/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { defaultTypeOrmOptions } from './blog/libs/common/src/database/typeorm/typeorm-module.options';
import { PostController } from './blog/api/board/post.controller';
import { PostService } from './blog/api/board/post.service';
import { ContentModule } from './blog/libs/dao/src/post/content.module';
import { CategoryModule } from './blog/libs/dao/src/category/category.module';
import { CategoryController } from './blog/api/category/category.controller';
import { CategoryService } from './blog/api/category/category.service';

@Module({
  imports: [
    //config
    // Configuration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '/.env',
    }),
    // DB
    TypeOrmModule.forRoot(defaultTypeOrmOptions),
    ContentModule,
    CategoryModule,
  ],
  controllers: [AppController, PostController, CategoryController],
  providers: [AppService, PostService, CategoryService],
})
export class AppModule {}
