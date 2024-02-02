import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { Category } from 'src/post/entities/category.entity';
import { UserService } from 'src/user/service/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private userService: UserService,
  ) { }

  getOneCategoryById(id: number) {
    return this.categoryRepo.findOne({
      where: {
        id,
      },
    });
  }

  getAll(limit: number, offset: number) {
    return {
      category: this.categoryRepo.find({
        take: limit,
        skip: offset,
      }),
    };
  }

  async createNewCategory(categoryDetail: CreateCategoryDto) {
    const oldCategory = await this.categoryRepo.findOne({
      where: {
        source: categoryDetail.source,
        destination: categoryDetail.destination,
      },
    });

    if (!!oldCategory) {
      throw new BadRequestException('This category already exist.');
    }

    const category = this.categoryRepo.create({
      ...categoryDetail,
      createdAt: new Date(),
    });
    return this.categoryRepo.save(category);
  }

  async buyCategories(email: string, body: BuyCategoriesDto) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new NotFoundException();
    }

    if (body.categories.length < 0) {
      throw new BadRequestException();
    }

    let categories: Category[] = [];
    for (let category of body.categories) {
      const foundCategory = await this.categoryRepo.findOne({ where: { id: category } })
      categories.push(foundCategory);
    }
    user.AccessedCategories = categories;

    return this.userService.updateUserBuyOtherModules(user)
  }
}
