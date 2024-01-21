import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/post/dtos/create-post.dto';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  createPost(postDetail: CreatePostDto) {
    const post = this.postRepo.create({ ...postDetail, createdAt: new Date() });

    return this.postRepo.save(post);
  }

  getAllPosts(limit: number, offset: number) {
    return this.postRepo.find();
  }
}
