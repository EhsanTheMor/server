import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonService } from '../season/season.service';
import { Tutorial } from '../../entities/tutorial.entity';
import { CreateTutorialDto } from '../../dtos/create-tutorial.dto';
import { User } from 'src/features/user/entities/User.entity';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tutorial) private tutorialRepo: Repository<Tutorial>,
    private seasonService: SeasonService,
  ) {}

  async getAllTutorials(
    limit: number,
    offset: number,
    seasonId: number | null,
  ) {
    const season = await this.seasonService.getSeasonById(seasonId);

    const tutorials = await this.tutorialRepo.find({
      take: limit,
      skip: offset,
      where: {
        season: season,
      },
      relations: {
        createdBy: true,
        season: true,
        contents: true,
      },
    });

    return tutorials;
  }

  async getTutorialById(id: number, contentOrder: 'ASC' | 'DESC' = 'ASC') {
    const tutorial = await this.tutorialRepo.findOne({
      where: {
        id,
      },
      relations: {
        createdBy: true,
        season: true,
        contents: true,
      },
      order: {
        contents: {
          id: 'ASC',
        },
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

  async deleteTutorial(id: number) {
    const season = await this.tutorialRepo.findOne({
      where: {
        id,
      },
    });

    return this.tutorialRepo.delete(season);
  }
}
