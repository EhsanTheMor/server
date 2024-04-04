import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorial } from 'src/tutorial/entities/tutorial.entity';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { SeasonService } from '../season/season.service';
import { CreateTutorialDto } from 'src/tutorial/dtos/create-tutorial.dto';

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
      relations: {
        createdBy: true,
        season: true,
        contents: true,
      },
    });

    return tutorials;
  }

  async getTutorialById(id: number) {
    const tutorial = await this.tutorialRepo.findOne({
      where: {
        id,
      },
      relations: {
        createdBy: true,
        season: true,
        contents: true,
      },
    });

    return tutorial;
  }

  async getTutorialByTitle(title: string) {
    const tutorial = await this.tutorialRepo.findOne({
      where: {
        title,
      },
    });

    return tutorial;
  }

  async createNewTutorial(body: CreateTutorialDto, user: User) {
    const season = await this.seasonService.getSeasonById(body.seasonId);

    if (!season) {
      throw new BadRequestException('فصل انتخاب شده صحیح نمی باشد.');
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
