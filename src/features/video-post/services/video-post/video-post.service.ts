import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPost } from '../../entities/video-post.entity';
import { Repository } from 'typeorm';
import { CreateVideoPostDto } from '../../dtos/create-video-post.dto';
import { User } from 'src/features/user/entities/User.entity';
import { VideoPostCategory } from '../../entities/video-post-category.entity';

@Injectable()
export class VideoPostService {
  constructor(
    @InjectRepository(VideoPost) private videoPostRepo: Repository<VideoPost>,
  ) {}

  async createNewVideoPost(
    body: CreateVideoPostDto,
    category: VideoPostCategory,
    fileName: string,
    user: User,
  ) {
    return this.videoPostRepo.create({
      createdAt: new Date(),
      createdBy: user,
      description: body.description,
      title: body.title,
      videoPostCategory: category,
      videoUrl: fileName,
    });
  }

  getVideoPostById(id: number) {
    return this.videoPostRepo.findOne({
      where: {
        id,
      },
    });
  }

  getVideoPosts(offset: number, limit: number) {
    return this.videoPostRepo.find({
      take: limit,
      skip: offset,
      relations: {
        createdBy: true,
        videoPostCategory: true,
      },
    });
  }

  async deleteOneVideoPost(post: VideoPost) {
    return this.videoPostRepo.delete(post);
  }
}
