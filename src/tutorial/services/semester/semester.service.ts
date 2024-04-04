import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemesterDto } from 'src/tutorial/dtos/create-semester.dto';
import { Semester } from 'src/tutorial/entities/semester.entity';
import { UserService } from 'src/user/service/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester) private semesterRepo: Repository<Semester>,
    private userService: UserService,
  ) {}

  async getAllSemesters(limit: number, offset: number) {
    const semesters = await this.semesterRepo.find({
      take: limit,
      skip: offset,
      relations: {
        season: true,
        createdBy: true,
      },
    });

    return semesters;
  }

  async getSemesterById(id: number) {
    const semester = await this.semesterRepo.findOne({
      where: {
        id,
      },
      relations: {
        createdBy: true,
        season: true,
      },
    });

    return semester;
  }

  async getSemesterByTitle(title: string) {
    const semester = await this.semesterRepo.findOne({
      where: {
        title,
      },
      relations: {
        season: true,
        createdBy: true,
      },
    });

    return semester;
  }

  async createSemester(body: CreateSemesterDto, createrId: number) {
    const user = await this.userService.getUserById(createrId);

    const semester = await this.semesterRepo.create({
      createdAt: new Date(),
      title: body.title,
    });

    semester.createdBy = user;

    return this.semesterRepo.save(semester);
  }

  async deleteSemester(id: number) {
    const semester = await this.semesterRepo.findOne({
      where: {
        id,
      },
    });
    return this.semesterRepo.delete(semester);
  }
}
