import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/tutorial/entities/season.entity';
import { Repository } from 'typeorm';
import { SemesterService } from '../semester/semester.service';
import { User } from 'src/user/entities/User.entity';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season) private seasonRepo: Repository<Season>,
    private semesterService: SemesterService,
  ) {}

  async getAllSeasons(limit: number, offset: number) {
    const seasons = await this.seasonRepo.find({
      take: limit,
      skip: offset,
    });

    return seasons;
  }

  async getSeasonById(id: number) {
    const season = await this.seasonRepo.findOne({
      where: {
        id,
      },
    });

    return season;
  }

  async getSeasonByTitle(title: string) {
    const season = await this.seasonRepo.findOne({
      where: {
        title,
      },
    });

    return season;
  }

  //   TODO: change body type to dto
  async createNewSeason(body: any, user: User) {
    const semester = await this.semesterService.getSemesterById(
      body.semesterId,
    );

    if (!semester) {
      return new BadRequestException('ترم انتخاب شده صحیح نیست.');
    }

    const newSeason = await this.seasonRepo.create({
      createdAt: new Date(),
      title: body.title,
    });

    newSeason.createdBy = user;
    newSeason.semester = semester;

    return this.seasonRepo.save(newSeason);
  }
}
