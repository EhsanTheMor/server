import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyCategoriesDto } from 'src/post/dtos/buy-categories.dto';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { Category } from 'src/post/entities/category.entity';
import { User } from 'src/user/entities/User.entity';
import { UserService } from 'src/user/service/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private userService: UserService,
  ) {}

  async createNewCategory(
    categoryDetail: CreateCategoryDto,
    currentUser: User,
  ) {
    const user = await this.userService.getUserById(currentUser.id);

    const category = this.categoryRepo.create({
      ...categoryDetail,
      createdAt: new Date(),
    });
    category.createdBy = user;

    return this.categoryRepo.save(category);
  }

  getOneCategoryById(id: number) {
    return this.categoryRepo.findOne({
      where: {
        id,
      },
    });
  }

  async getAll(limit: number, offset: number) {
    const categories = await this.categoryRepo.find({
      take: limit,
      skip: offset,
      relations: {
        posts: true,
      },
    });

    return categories;
  }

  async buyCategories(email: string, body: BuyCategoriesDto) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (body.categories.length < 0) {
      throw new BadRequestException();
    }

    let categories: Category[] = [];
    for (let category of body.categories) {
      const foundCategory = await this.categoryRepo.findOne({
        where: { id: category },
      });
      categories.push(foundCategory);
    }
    user.AccessedCategories = categories;

    return this.userService.updateUserBuyOtherModules(user);
  }
}
