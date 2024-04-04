import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { jwtConstants } from './constants/constants';
import { Category } from './post/entities/category.entity';
import { Post } from './post/entities/post.entity';
import { PostModule } from './post/post.module';
import { User } from './user/entities/User.entity';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { TutorialModule } from './tutorial/tutorial.module';
import { MessageModule } from './message/message.module';
import { Semester } from './tutorial/entities/semester.entity';
import { Season } from './tutorial/entities/season.entity';
import { Tutorial } from './tutorial/entities/tutorial.entity';
import { Content } from './tutorial/entities/content.entity';

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
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
