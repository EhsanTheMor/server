import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVideoPostDto } from '../../dtos/create-video-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../../constants/video-post-file-storage';
import { CurrentUserDecorator } from 'src/features/user/decorators/current-user.decorator';
import { User } from 'src/features/user/entities/User.entity';
import { VideoPostService } from '../../services/video-post/video-post.service';
import { VideoPostCategoryService } from '../../services/video-post-category/video-post-category.service';
import { Response } from 'express';
import path from 'path';
import { AdminGuard } from 'src/guards/admin.guard';
import { extractLimitAndOffset } from 'src/helpers/controller-offset-limit.helper';
import fs from 'fs';

@UseGuards(AuthGuard)
@Controller('video-post')
export class VideoPostController {
  constructor(
    private videoPostService: VideoPostService,
    private videoPostCategoryService: VideoPostCategoryService,
  ) {}

  @Get()
  getVideoPosts(@Query() query: any) {
    const { limit, offset } = extractLimitAndOffset(query);

    return this.videoPostService.getVideoPosts(offset, limit);
  }

  @Get('/:id')
  getOneVideoPost(@Param('id') id: number) {
    this.videoPostService.getVideoPostById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async createVideoPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateVideoPostDto,
    @CurrentUserDecorator() user: User,
  ) {
    const category = await this.videoPostCategoryService.getCategoryById(
      body.videoPostCategoryId,
    );

    if (!category) {
      throw new BadRequestException('دسته بندی ارسال شده صحیح نمی باشد.');
    }

    if (!file) {
      throw new BadRequestException('فایل به درستی ارسال نشده است.');
    }

    return this.videoPostService.createNewVideoPost(
      body,
      category,
      file.filename,
      user,
    );
  }

  @Get('getfile/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(path.join(process.cwd(), 'video-post', filename));
  }

  @Delete('/:id')
  async deleteOneVideoPost(@Param('id') id: number) {
    const post = await this.videoPostService.getVideoPostById(id);

    if (!post) {
      throw new BadRequestException('پست مورد نظر وجود ندارد.');
    }

    fs.rmSync(path.join(process.cwd(), 'video-posts', post.videoUrl));

    return this.videoPostService.deleteOneVideoPost(post);
  }
}
