import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterService } from '../semester/semester.service';
import { Season } from '../../entities/season.entity';
import { CreateSeasonDto } from '../../dtos/create-season.dto';
import { User } from 'src/features/user/entities/User.entity';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season) private seasonRepo: Repository<Season>,
    private semesterService: SemesterService,
  ) {}

  async getAllSeasons(
    limit: number,
    offset: number,
    semesterId: number | null,
  ) {
    const semester = await this.semesterService.getSemesterById(semesterId);

    const seasons = await this.seasonRepo.find({
      take: limit,
      skip: offset,
      where: {
        semester: semester,
      },
      relations: {
        createdBy: true,
        semester: true,
        tutorials: true,
      },
    });

    return seasons;
  }

  async getSeasonById(id: number) {
    const season = await this.seasonRepo.findOne({
      where: {
        id,
      },
      relations: {
        tutorials: true,
        createdBy: true,
        semester: true,
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

  async createNewSeason(body: CreateSeasonDto, user: User) {
    const semester = await this.semesterService.getSemesterById(
      body.semesterId,
    );

    if (!semester) {
      throw new BadRequestException('ترم انتخاب شده صحیح نیست.');
    }

    const newSeason = await this.seasonRepo.create({
      createdAt: new Date(),
      title: body.title,
    });

    newSeason.createdBy = user;
    newSeason.semester = semester;

    return this.seasonRepo.save(newSeason);
  }

  async deleteSeason(id: number) {
    const season = await this.seasonRepo.findOne({
      where: {
        id,
      },
    });

    return this.seasonRepo.delete(season);
  }
}
