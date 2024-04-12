import {
  BadRequestException,
  Body,
  Controller,
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
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreatePostDto } from '../../dtos/create-post.dto';
import { GetAllPostDto } from '../../dtos/get-all-post.dto';
import { PostService } from '../../service/post/post.service';
import { PostDto } from '../../dtos/post.dto';
import { storage } from '../../constants/file-upload-storage.constants';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @Serialize(PostDto)
  getAllPosts(@Param() param: GetAllPostDto) {
    let limit = param.limit || 20;
    let offset = param.offset || 0;
    return this.postService.getAllPosts(limit, offset);
  }

  // TODO: setup file guard
  @Post()
  @Serialize(PostDto)
  @UseInterceptors(FileInterceptor('file', storage))
  async createNewPost(
    @Body() body: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('عکسی برای این پست ارسال نشده است.');
    }
    return this.postService.createPost(body, file.filename);
  }

  @Get('/:id')
  @Serialize(PostDto)
  async getOnePost(@Param('id') id: number) {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @Get('getfile/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(path.join(process.cwd(), 'uploads', filename));
  }
}
