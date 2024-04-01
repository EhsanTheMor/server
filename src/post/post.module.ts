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
import { FileService } from './service/file/file.service';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, File]), UserModule],
  providers: [PostService, CategoryService, FileService],
  controllers: [PostController, CategoryController],
})
export class PostModule {}
