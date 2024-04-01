import path from 'path';
import {
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
import { CreatePostDto } from '../../dtos/create-post.dto';
import { GetAllPostDto } from '../../dtos/get-all-post.dto';
import { PostService } from '../../service/post/post.service';
import { CurrentUserGuard } from 'src/post/guards/current-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { storage } from 'src/post/constants/fileUploadStorage';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(@Param() param: GetAllPostDto) {
    let limit = param.limit || 20;
    let offset = param.offset || 0;
    return this.postService.getAllPosts(limit, offset);
  }

  @UseGuards(CurrentUserGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async createNewPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePostDto,
  ) {
    return this.postService.createPost(body, file.filename);
  }

  @Get('/:id')
  async getOnePost(@Param('id') id: number) {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @Get('getfile/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(path.join(process.cwd(), 'uploads', filename));
  }
}
