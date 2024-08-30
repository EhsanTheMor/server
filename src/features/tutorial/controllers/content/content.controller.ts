import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, Injectable,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import path from 'path';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import fs from 'fs';
import { ContentService } from '../../services/content/content.service';
import { CreateContentResponseDto } from '../../dtos/create-content-response.dto';
import { storage } from '../../constants/file-upload-storage.constant';
import { CreateContentDto } from '../../dtos/create-content.dto';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';
import { User } from 'src/features/user/entities/User.entity';
import { ContentTypes } from '../../entities/content.entity';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("content")
@UseGuards(AuthGuard)
@Controller('content')
export class ContentController {
  constructor(
    private contentService: ContentService,
    private tutorialService: TutorialService,
  ) {}

  @Get()
  async getContentsOfOneTutorial(@Query() query: any) {
    if (!query.tutorialId) {
      throw new BadRequestException('درس مورد نظر یافت نشد.');
    }

    const tutorialId = Number(query.tutorialId);

    const tutorial = await this.tutorialService.getTutorialById(tutorialId);

    if (!tutorial) {
      throw new BadRequestException('درس مورد نظر یافت نشد.');
    }

    return this.contentService.getContentsOfOneTutorial(tutorial);
  }

  @Post()
  @Serialize(CreateContentResponseDto)
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  createNewContent(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateContentDto,
    @CurrentUserDecorator() user: User,
  ) {
    let description = body.description;

    if (
      (body.type === ContentTypes.Image || body.type === ContentTypes.Video) &&
      !!file
    ) {
      description = file.filename;
    } else if (
      (body.type === ContentTypes.Image || body.type === ContentTypes.Video) &&
      !file
    ) {
      throw new BadRequestException(
        'فایل به درستی ارسال نشده است لطفا دوباره تلاش کنید.',
      );
    }

    return this.contentService.createNewContent(body, description, user);
  }

  @Get('getfile/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(path.join(process.cwd(), 'contents', filename));
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async deleteContent(@Param('id') id: number) {
    const content = await this.contentService.getContentById(id);

    if (
      content.type === ContentTypes.Image ||
      content.type === ContentTypes.Video
    ) {
      fs.rmSync(path.join(process.cwd(), 'contents', content.description));
    }

    return this.contentService.deleteContent(id);
  }
}
