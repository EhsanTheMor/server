import { Module } from '@nestjs/common';
import { TutorialController } from './controllers/tutorial/tutorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Semester } from './entities/semester.entity';
import { Season } from './entities/season.entity';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialService } from './services/tutorial/tutorial.service';
import { ContentService } from './services/content/content.service';
import { SemesterController } from './controllers/semester/semester.controller';
import { SeasonController } from './controllers/season/season.controller';
import { SeasonService } from './services/season/season.service';
import { SemesterService } from './services/semester/semester.service';
import { ContentController } from './controllers/content/content.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Semester, Season, Tutorial]),
    UserModule,
  ],
  controllers: [
    TutorialController,
    SemesterController,
    SeasonController,
    ContentController,
  ],
  providers: [TutorialService, ContentService, SeasonService, SemesterService],
})
export class TutorialModule {}
