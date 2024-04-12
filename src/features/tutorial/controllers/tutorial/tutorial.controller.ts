import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { extractLimitAndOffset } from 'src/helpers/controller-offset-limit.helper';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { TutorialDto } from '../../dtos/tutorial.dto';
import { CreateTutorialResponseDto } from '../../dtos/create-tutorial-response.dto';
import { CreateTutorialDto } from '../../dtos/create-tutorial.dto';
import { User } from 'src/features/user/entities/User.entity';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('tutorial')
export class TutorialController {
  constructor(private tutorialService: TutorialService) {}

  @Get()
  @Serialize(TutorialDto)
  getAppTutorials(@Query() query: any) {
    const { limit, offset } = extractLimitAndOffset(query);
    const seasonId = Number(query.seasonId) || null;

    return this.tutorialService.getAllTutorials(limit, offset, seasonId);
  }

  @Get('/:id')
  @Serialize(TutorialDto)
  async getOneTutorial(@Param('id') id: number) {
    const tutorial = await this.tutorialService.getTutorialById(id);
    if (!tutorial) {
      throw new BadRequestException('آموزش انتخاب شده اشتباه است.');
    }
    return tutorial;
  }

  @Post()
  @UseGuards(AdminGuard)
  @Serialize(CreateTutorialResponseDto)
  createNewTutorial(
    @Body() body: CreateTutorialDto,
    @CurrentUserDecorator() user: User,
  ) {
    return this.tutorialService.createNewTutorial(body, user);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteSemester(@Param('id') id: number) {
    return this.tutorialService.deleteTutorial(id);
  }
}
