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
import { CategoryService } from '../../service/category/category.service';
import { CategoryDto } from '../../dtos/category.dto';
import { CreateCategoryDto } from '../../dtos/create-category.dto';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';
import { User } from 'src/features/user/entities/User.entity';
import { BuyCategoriesDto } from '../../dtos/buy-categories.dto';

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
