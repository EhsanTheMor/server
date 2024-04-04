import { Module } from '@nestjs/common';
import { TutorialController } from './controllers/tutorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Semester } from './entities/semester.entity';
import { Season } from './entities/season.entity';
import { Tutorial } from './entities/tutorial.entity';
import { UserModule } from 'src/user/user.module';
import { TutorialService } from './services/tutorial/tutorial.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Semester, Season, Tutorial]),
    UserModule,
  ],
  controllers: [TutorialController],
  providers: [TutorialService],
})
export class TutorialModule {}
