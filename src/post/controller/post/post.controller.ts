import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from '../../dtos/create-post.dto';
import { GetAllPostDto } from '../../dtos/get-all-post.dto';
import { PostService } from '../../service/post/post.service';
import { CurrentUserGuard } from 'src/post/guards/current-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
  createNewPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  getNewFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { [key: string]: string },
  ) {
    return 'thanks';
  }
}
