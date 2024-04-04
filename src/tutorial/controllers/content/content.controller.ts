import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { storage } from 'src/tutorial/constants/file-upload-storage.constant';
import { CreateContentResponseDto } from 'src/tutorial/dtos/create-content-response.dto';
import { CreateContentDto } from 'src/tutorial/dtos/create-content.dto';
import { ContentTypes } from 'src/tutorial/entities/content.entity';
import { ContentService } from 'src/tutorial/services/content/content.service';
import { CurrentUserDecorator } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/User.entity';
import fs from 'fs';

@UseGuards(AuthGuard)
@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

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
