import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { CategoryService } from 'src/post/service/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createNewCategory(@Body() body: CreateCategoryDto) {
    this.categoryService.createNewCategory(body);
  }

  @Get()
  getAllcategories(@Param() param: { offset?: number; limit?: number }) {
    let offset = param.offset || 0;
    let limit = param.limit || 20;

    return this.categoryService.getAll(limit, offset);
  }
}
