import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/post/dtos/create-category.dto';
import { Category } from 'src/post/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

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
}
