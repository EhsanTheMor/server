import { Module } from '@nestjs/common';
import { PostsService } from './services/posts/posts.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { PostsController } from './controller/posts/posts.controller';
import { Post } from "./entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
