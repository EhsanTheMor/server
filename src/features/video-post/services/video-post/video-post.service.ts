import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPost } from '../../entities/video-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoPostService {
  constructor(
    @InjectRepository(VideoPost) private videoPostRepo: Repository<VideoPost>,
  ) {}
}
