import { ContentRepository } from '../src/content/content.repository';
import { Test } from '@nestjs/testing';
import { TestEnvironConfig } from './test-environ.config';
import {
  getCustomRepository,
  TypeOrmExModule,
} from '../../common/src/database/typeorm/typeorm-ex.module';
import { defaultTypeOrmOptions } from '../../common/src/database/typeorm/typeorm-module.options';
import { Content } from '../src/content/content.entity';
import { ContentModule } from '../src/content/content.module';
import { Logger } from '@nestjs/common';
import { CategoryRepository } from '../src/category/category.repository';
import { CategoryModule } from '../../../api/category/category.module';
import { Category } from '../src/category/category.entity';

describe('ContentRepositoryTest', () => {
  let contentRepository: ContentRepository;
  let categoryRepository: CategoryRepository;
  let id: number;
  let createdCategory: Category;
  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [
        TestEnvironConfig,
        TypeOrmExModule.forRoot(defaultTypeOrmOptions),
        ContentModule,
        CategoryModule,
      ],
    }).compile();

    contentRepository = getCustomRepository(
      ContentRepository,
      process.env.DB_NAME,
    );
    categoryRepository = getCustomRepository(
      CategoryRepository,
      process.env.DB_NAME,
    );
    id = 1;
    createdCategory = await categoryRepository.findById(id);
  });

  afterEach(async () => {
    await contentRepository.delete({ id: id });
    Logger.log('content repository test finish');
  });

  it('CRD', async () => {
    // CREATE
    const createdContent = await contentRepository.save(
      new Content({
        title: 'test-title',
        body: 'test-body',
        category: await createdCategory,
      }),
    );
    expect(createdContent).not.toBeNull();

    //READ
    const readId = 3;
    const content = await contentRepository.findById(readId);
    expect(content.id).toBe(createdContent.id);

    //SOFT DELETE
    const result = await contentRepository.softDelete(content.id);
    expect(result.affected).toBe(1);

    //RE-CREATE
    const updateResult = await contentRepository.upsert(
      {
        id: content.id,
        title: 'test-upsert-title',
        body: 'test-upsert-body',
        category: await createdCategory,
      },
      ['id'],
    );
    expect(updateResult.raw.affectedRows).toBe(1);
  });
});
