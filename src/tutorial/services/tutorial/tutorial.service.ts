import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorial } from 'src/tutorial/entities/tutorial.entity';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { SeasonService } from '../season/season.service';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tutorial) private tutorialRepo: Repository<Tutorial>,
    private seasonService: SeasonService,
  ) {}

  async getAllTutorials(limit: number, offset: number) {
    const tutorials = await this.tutorialRepo.find({
      take: limit,
      skip: offset,
    });

    return tutorials;
  }

  async getTutorialById(id: number) {
    const tutorial = await this.tutorialRepo.find({
      where: {
        id,
      },
    });

    return tutorial;
  }

  async getTutorialByTitle(title: string) {
    const tutorial = await this.tutorialRepo.find({
      where: {
        title,
      },
    });

    return tutorial;
  }

  async createNewTutorial(body: any, user: User) {
    const season = await this.seasonService.getSeasonById(body.seasonId);

    if (!season) {
      return new BadRequestException('فصل انتخاب شده صحیح نمی باشد.');
    }

    const newTutorial = await this.tutorialRepo.create({
      createdAt: new Date(),
      title: body.title,
    });

    newTutorial.createdBy = user;
    newTutorial.season = season;

    return this.tutorialRepo.save(newTutorial);
  }
}
