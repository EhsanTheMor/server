import { Module } from '@nestjs/common';
import { TutorialController } from './controllers/tutorial.controller';
import { TutorialService } from './services/tutorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Semester } from './entities/semester.entity';
import { Season } from './entities/season.entity';
import { Tutorial } from './entities/tutorial.entity';
import { UserModule } from 'src/user/user.module';
import { SemesterService } from './services/semester/semester.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Semester, Season, Tutorial]),
    UserModule,
  ],
  controllers: [TutorialController],
  providers: [TutorialService, SemesterService],
})
export class TutorialModule {}
