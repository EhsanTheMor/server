import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { CurrentUserGuard } from 'src/post/guards/current-user.guard';
import { CategoryService } from 'src/post/service/category/category.service';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @UseGuards(CurrentUserGuard)
  @Post()
  createNewCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createNewCategory(body);
  }

  @Get()
  getAllcategories(@Param() param: { offset?: number; limit?: number }) {
    let offset = param.offset || 0;
    let limit = param.limit || 20;

    return this.categoryService.getAll(limit, offset);
  }

  @Post('/buy')
  buyCategory(@Body() body: BuyCategoriesDto, @Request() req: Request) {
    // @ts-ignore
    const user = req.currentUser;
    return this.categoryService.buyCategories(user?.email, body)
  }
}
