import { Module } from '@nestjs/common';
import { VideoPostController } from './controllers/video-post/video-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';
import { VideoPostCategory } from './entities/video-post-category.entity';
import { VideoPostService } from './services/video-post/video-post.service';
import { VideoPostCategoryService } from './services/video-post-category/video-post-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoPost, VideoPostCategory])],
  controllers: [VideoPostController],
  providers: [VideoPostService, VideoPostCategoryService],
})
export class VideoPostModule {}
