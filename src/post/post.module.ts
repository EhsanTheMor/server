import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controller/category/category.controller';
import { PostController } from './controller/post/post.controller';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { CategoryService } from './service/category/category.service';
import { PostService } from './service/post/post.service';
import { UserService } from 'src/user/service/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), UserModule],
  providers: [PostService, CategoryService],
  controllers: [PostController, CategoryController],
})
export class PostModule { }
