import {
  BadRequestException,
  Body,
  Controller,
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
import { CreateTutorialResponseDto } from 'src/tutorial/dtos/create-tutorial-response.dto';
import { CreateTutorialDto } from 'src/tutorial/dtos/create-tutorial.dto';
import { TutorialDto } from 'src/tutorial/dtos/tutorial.dto';
import { TutorialService } from 'src/tutorial/services/tutorial/tutorial.service';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/User.entity';

@UseGuards(AuthGuard)
@Controller('tutorial')
export class TutorialController {
  constructor(private tutorialService: TutorialService) {}

  @Get()
  @Serialize(TutorialDto)
  getAppTutorials(@Query() query: any) {
    const { limit, offset } = extractLimitAndOffset(query);

    return this.tutorialService.getAllTutorials(limit, offset);
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
}
