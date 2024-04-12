import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreatePostDto } from '../../dtos/create-post.dto';
import { Post } from '../../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private categoryService: CategoryService,
  ) {}

  async createPost(postDetail: CreatePostDto, imageUrl: string | undefined) {
    const category = await this.categoryService.getOneCategoryById(
      postDetail.category,
    );

    const post = this.postRepo.create({
      ...postDetail,
      imageUrl,
      createdAt: new Date(),
      category: category,
    });

    return this.postRepo.save(post);
  }

  async getPostById(id: number) {
    const post = await this.postRepo.findOne({
      where: {
        id,
      },
    });

    return post;
  }

  getAllPosts(limit: number, offset: number) {
    return this.postRepo.find({
      take: limit,
      skip: offset,
      relations: {
        category: true,
      },
    });
  }

  deletePost(id: number) {
    return this.postRepo.delete({
      id,
    });
  }
}
