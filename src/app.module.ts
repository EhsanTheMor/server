import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { jwtConstants } from './constants/constants';
import { User } from './features/user/entities/User.entity';
import { Category } from './features/post/entities/category.entity';
import { Semester } from './features/tutorial/entities/semester.entity';
import { Season } from './features/tutorial/entities/season.entity';
import { Tutorial } from './features/tutorial/entities/tutorial.entity';
import { Content } from './features/tutorial/entities/content.entity';
import { UserModule } from './features/user/user.module';
import { PostModule } from './features/post/post.module';
import { TutorialModule } from './features/tutorial/tutorial.module';
import { MessageModule } from './features/message/message.module';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { Post } from './features/post/entities/post.entity';
import { VideoPostModule } from './features/video-post/video-post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Post, Category, Semester, Season, Tutorial, Content],
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90d' },
    }),
    PostModule,
    TutorialModule,
    MessageModule,
    VideoPostModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
