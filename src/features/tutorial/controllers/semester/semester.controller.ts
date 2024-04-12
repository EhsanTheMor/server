import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { extractLimitAndOffset } from 'src/helpers/controller-offset-limit.helper';
import { SemesterService } from '../../services/semester/semester.service';
import { SemesterDto } from '../../dtos/semester.dto';
import { CreateSemesterResponseDto } from '../../dtos/create-semester-response.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { User } from 'src/features/user/entities/User.entity';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';
import { CreateSemesterDto } from '../../dtos/create-semester.dto';

@UseGuards(AuthGuard)
@Controller('semester')
export class SemesterController {
  constructor(private semesterService: SemesterService) {}

  @Get()
  @Serialize(SemesterDto)
  getAllSemesters(@Param() param: any) {
    const { limit, offset } = extractLimitAndOffset(param);

    return this.semesterService.getAllSemesters(limit, offset);
  }

  @Get('/:id')
  @Serialize(SemesterDto)
  async getOneSemester(@Param('id') id: number) {
    const semester = await this.semesterService.getSemesterById(id);

    if (!semester) {
      throw new BadRequestException('فصل انتخاب شده وجود ندارد.');
    }

    return semester;
  }

  @Post()
  @Serialize(CreateSemesterResponseDto)
  @UseGuards(AdminGuard)
  createNewSemester(
    @CurrentUserDecorator() user: User,
    @Body() body: CreateSemesterDto,
  ) {
    return this.semesterService.createSemester(body, user.id);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteSemester(@Param('id') id: number) {
    return this.semesterService.deleteSemester(id);
  }
}
