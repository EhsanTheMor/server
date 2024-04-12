import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPostCategory } from '../../entities/video-post-category.entity';
import { Repository } from 'typeorm';
import { CreateVideoPostCategoryDto } from '../../dtos/create-video-post-category.dto';

@Injectable()
export class VideoPostCategoryService {
  constructor(
    @InjectRepository(VideoPostCategory)
    private videoPostCategoryRepo: Repository<VideoPostCategory>,
  ) {}

  getCategories() {
    return this.videoPostCategoryRepo.find();
  }

  getCategoryById(id: number) {
    return this.videoPostCategoryRepo.findOne({
      where: {
        id,
      },
    });
  }

  createNewVideoPostCategory(body: CreateVideoPostCategoryDto) {
    const newCategory = this.videoPostCategoryRepo.create({
      title: body.title,
      createdAt: new Date(),
    });

    return this.videoPostCategoryRepo.save(newCategory);
  }

  async deleteCategory(id: number) {
    const category = await this.videoPostCategoryRepo.findOne({
      where: {
        id,
      },
    });
    return await this.videoPostCategoryRepo.delete(category);
  }
}
