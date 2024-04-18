import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutorialService } from '../tutorial/tutorial.service';
import { Content } from '../../entities/content.entity';
import { CreateContentDto } from '../../dtos/create-content.dto';
import { User } from 'src/features/user/entities/User.entity';
import { Tutorial } from '../../entities/tutorial.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepo: Repository<Content>,
    private tutorialService: TutorialService,
  ) {}

  getContentsOfOneTutorial(tutorial: Tutorial) {
    return this.contentRepo.find({
      where: {
        tutorial,
      },
      order: {
        description: 'ASC',
      },
    });
  }

  async getContentById(id: number) {
    const content = await this.contentRepo.findOne({
      where: {
        id,
      },
    });

    return content;
  }

  async createNewContent(
    body: CreateContentDto,
    description: string,
    user: User,
  ) {
    const tutorial = await this.tutorialService.getTutorialById(
      body.tutorialId,
      'DESC',
    );
    let displayOrder = 1;

    if (!tutorial) throw new BadRequestException('درس انتخاب شده اشتباه است.');

    if (tutorial.contents.length !== 0) {
      displayOrder =
        tutorial.contents[tutorial.contents.length - 1].displayOrder + 1;
    }

    const newContent = await this.contentRepo.create({
      createdAt: new Date(),
      description: description,
      displayOrder,
      type: body.type,
    });

    newContent.createdBy = user;
    newContent.tutorial = tutorial;

    return this.contentRepo.save(newContent);
  }

  async deleteContent(id: number) {
    const season = await this.contentRepo.findOne({
      where: {
        id,
      },
    });

    return this.contentRepo.delete(season);
  }
}
