import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { CurrentUserGuard } from 'src/post/guards/current-user.guard';
import { CategoryService } from 'src/post/service/category/category.service';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(CurrentUserGuard)
  @Post()
  createNewCategory(@Body() body: CreateCategoryDto, @Request() req: Request) {
    // @ts-ignore
    const user = req.currentUser;
    return this.categoryService.createNewCategory(body, user);
  }

  @Get()
  getAllcategories(@Query() query: { offset: number; limit: number }) {
    const { offset, limit } = query;

    if (!limit || !offset) {
      throw new BadRequestException('offset and limit is needed.');
    }

    return this.categoryService.getAll(limit, offset);
  }

  @Post('/buy')
  buyCategory(@Body() body: BuyCategoriesDto, @Request() req: Request) {
    // TODO create a current user interceptor
    // @ts-ignore
    const user = req.currentUser;
    return this.categoryService.buyCategories(user?.email, body);
  }
}
