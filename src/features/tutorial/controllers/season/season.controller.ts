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
import { SeasonService } from '../../services/season/season.service';
import { SeasonDto } from '../../dtos/season.dto';
import { CreateSeasonResponseDto } from '../../dtos/create-season-response';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';
import { CreateSeasonDto } from '../../dtos/create-season.dto';
import { User } from 'src/features/user/entities/User.entity';

@UseGuards(AuthGuard)
@Controller('season')
export class SeasonController {
  constructor(private seasonService: SeasonService) {}

  @Get()
  @Serialize(SeasonDto)
  getAllSeason(@Query() query: any) {
    const { limit, offset } = extractLimitAndOffset(query);
    const semesterId = Number(query.semesterId) || null;

    return this.seasonService.getAllSeasons(limit, offset, semesterId);
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

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteSeason(@Param('id') id: number) {
    return this.seasonService.deleteSeason(id);
  }
}
