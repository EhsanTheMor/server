import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { UserService } from 'src/features/user/service/user/user.service';
import { CreateCategoryDto } from '../../dtos/create-category.dto';
import { User } from 'src/features/user/entities/User.entity';
import { BuyCategoriesDto } from '../../dtos/buy-categories.dto';

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
