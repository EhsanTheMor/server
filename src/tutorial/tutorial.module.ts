import { Module } from '@nestjs/common';
import { TutorialController } from './controllers/tutorial.controller';
import { TutorialService } from './services/tutorial.service';

@Module({
  controllers: [TutorialController],
  providers: [TutorialService]
})
export class TutorialModule {}
