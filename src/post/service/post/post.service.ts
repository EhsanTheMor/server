import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/post/dtos/create-post.dto';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private categoryService: CategoryService,
  ) {}

  async createPost(postDetail: CreatePostDto) {
    const category = await this.categoryService.getOneCategoryById(
      postDetail.category,
    );

    const post = this.postRepo.create({
      ...postDetail,
      createdAt: new Date(),
      category: category,
    });

    return this.postRepo.save(post);
  }

  getAllPosts(limit: number, offset: number) {
    return this.postRepo.find({
      relations: {
        category: true,
      },
    });
  }
}
