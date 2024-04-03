import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';
import { CategoryDto } from 'src/post/dtos/category.dto';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { CategoryService } from 'src/post/service/category/category.service';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/User.entity';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  @Serialize(CategoryDto)
  createNewCategory(
    @Body() body: CreateCategoryDto,
    @CurrentUserDecorator() user: User,
  ) {
    return this.categoryService.createNewCategory(body, user);
  }

  @Get()
  @Serialize(CategoryDto)
  getAllcategories(@Query() query: { offset: number; limit: number }) {
    const { offset, limit } = query;

    if (!limit || !offset) {
      throw new BadRequestException('offset and limit is needed.');
    }

    return this.categoryService.getAll(limit, offset);
  }

  @Post('/buy')
  buyCategory(
    @Body() body: BuyCategoriesDto,
    @CurrentUserDecorator() user: any,
  ) {
    return this.categoryService.buyCategories(user?.email, body);
  }
}
