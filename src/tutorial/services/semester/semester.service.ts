import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    });

    return semesters;
  }

  async getSemesterById(id: number) {
    const semester = await this.semesterRepo.findOne({
      where: {
        id,
      },
    });

    return semester;
  }

  async getSemesterByTitle(title: string) {
    const semester = await this.semesterRepo.findOne({
      where: {
        title,
      },
    });

    return semester;
  }

  // TODO: change body to a dto
  async createSemester(body: any, createrId: number) {
    const user = await this.userService.getUserById(createrId);

    const semester = await this.semesterRepo.create({
      createdAt: new Date(),
      title: body.title,
    });

    semester.createdBy = user;

    return this.semesterRepo.save(semester);
  }
}
