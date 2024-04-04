import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/tutorial/entities/content.entity';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { TutorialService } from '../tutorial/tutorial.service';
import { CreateContentDto } from 'src/tutorial/dtos/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepo: Repository<Content>,
    private tutorialService: TutorialService,
  ) {}

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
}
