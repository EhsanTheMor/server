import { Module } from '@nestjs/common';
import { PostsService } from './services/posts/posts.service';
import { PostsController } from './controller/posts/posts.controller';

@Module({
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
