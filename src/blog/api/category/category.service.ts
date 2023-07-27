import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryInDto } from './dto/create-category-in.dto';
import { UpdateCategoryInDto } from './dto/update-category-in.dto';
import { CategoryRepository } from '../../libs/dao/src/category/category.repository';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from '../../libs/dao/src/category/dto/category.dto';
import { InternalErrorCode } from '../../libs/common/src/constants/internal-error-code.constants';
import { find } from 'rxjs';
import { Category } from '../../libs/dao/src/category/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository, 'blog')
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async createCategory(
    createCategoryDto: CreateCategoryInDto,
  ): Promise<CategoryDto> {
    const category = await this.categoryRepository.findByTitle(
      createCategoryDto.title,
    );
    if (category) {
      throw new InternalServerErrorException(
        InternalErrorCode.CATEGORY_ALREADY_EXISTS,
        'CATEGORY_ALREADY_EXISTS',
      );
    }

    return CategoryDto.fromEntity(
      await this.categoryRepository.save(new Category(createCategoryDto)),
    );
  }

  async findCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map((it) => CategoryDto.fromEntity(it));
  }

  async findCategory(id: number): Promise<CategoryDto> {
    return CategoryDto.fromEntity(await this.categoryRepository.findById(id));
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryInDto,
  ): Promise<CategoryDto> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new InternalServerErrorException(
        InternalErrorCode.CATEGORY_NOT_FOUND,
        'CATEGORY_NOT_FOUND',
      );
    }

    // update 실패 시 -> 에러 코드 수정
    await this.categoryRepository.update(id, updateCategoryDto);

    const updatedCategory = await this.categoryRepository.findById(id);
    return CategoryDto.fromEntity(updatedCategory);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new InternalServerErrorException(
        InternalErrorCode.CATEGORY_NOT_FOUND,
        'CATEGORY_NOT_FOUND',
      );
    }

    await this.categoryRepository.softDelete(id);
  }
}
