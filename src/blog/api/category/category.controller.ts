import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryInDto } from './dto/create-category-in.dto';
import { UpdateCategoryInDto } from './dto/update-category-in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from '../../libs/dao/src/category/dto/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'create a category',
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryInDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all categories',
  })
  async findCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findCategories();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get a category',
  })
  async findCategory(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.findCategory(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update a category',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryInDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete a category',
  })
  async removeCategory(@Param('id') id: string): Promise<void> {
    return await this.categoryService.removeCategory(+id);
  }
}
