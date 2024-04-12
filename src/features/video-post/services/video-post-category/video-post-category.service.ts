import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPostCategory } from '../../entities/video-post-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoPostCategoryService {
  constructor(
    @InjectRepository(VideoPostCategory)
    private videoPostCategoryRepo: Repository<VideoPostCategory>,
  ) {}
}
