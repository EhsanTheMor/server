import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from 'src/post/service/category/category.service';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';

// TODO: setup serilization
// TODO: setup admin guard
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

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
  buyCategory(
    @Body() body: BuyCategoriesDto,
    @CurrentUserDecorator() user: any,
  ) {
    return this.categoryService.buyCategories(user?.email, body);
  }
}
