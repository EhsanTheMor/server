import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from "./users/entities/users.entity";
import { Post } from "./posts/entities/post.entity";

@Module({
  imports: [UsersModule, PostsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Post],
    synchronize: true,
  })],
  providers: [AppService],
})
export class AppModule {}
