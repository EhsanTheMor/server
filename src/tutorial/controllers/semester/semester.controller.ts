import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSemesterDto } from 'src/tutorial/dtos/create-semester.dto';
import { CreateSemesterResponseDto } from 'src/tutorial/dtos/create-semester-response.dto';
import { SemesterService } from 'src/tutorial/services/semester/semester.service';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/User.entity';
import { SemesterDto } from 'src/tutorial/dtos/semester.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { extractLimitAndOffset } from 'src/helpers/controller-offset-limit.helper';

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
}
