import {
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
import { CreateSeasonResponseDto } from 'src/tutorial/dtos/create-season-response';
import { CreateSeasonDto } from 'src/tutorial/dtos/create-season.dto';
import { SeasonDto } from 'src/tutorial/dtos/season.dto';
import { SeasonService } from 'src/tutorial/services/season/season.service';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/User.entity';

@UseGuards(AuthGuard)
@Controller('season')
export class SeasonController {
  constructor(private seasonService: SeasonService) {}

  @Get()
  @Serialize(SeasonDto)
  getAllSeason(@Query() query: any) {
    const { limit, offset } = extractLimitAndOffset(query);

    return this.seasonService.getAllSeasons(limit, offset);
  }

  @Get('/:id')
  @Serialize(SeasonDto)
  getOneSeason(@Param('id') id: number) {
    return this.seasonService.getSeasonById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  @Serialize(CreateSeasonResponseDto)
  createNewSeason(
    @CurrentUserDecorator() user: User,
    @Body() body: CreateSeasonDto,
  ) {
    return this.seasonService.createNewSeason(body, user);
  }

  @Post()
  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteSeason(@Param('id') id: number) {
    return this.seasonService.deleteSeason(id);
  }
}
