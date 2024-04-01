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
import { diskStorage } from 'multer';
import { FileService } from '../../service/file/file.service';
import { Response } from 'express';

const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private fileService: FileService,
  ) {}

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
    const newFile = await this.fileService.saveFile(file);
    return this.postService.createPost(body, newFile && newFile.filename);
  }

  @Get('getfile/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.fileService.findByName(filename);
    return res.sendFile(path.join(process.cwd(), 'uploads', file.filename));
  }
}
