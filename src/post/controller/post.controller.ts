import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { GetAllPostDto } from '../dtos/get-all-post.dto';
import { PostService } from '../service/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(@Param() param: GetAllPostDto) {
    let limit = param.limit || 20;
    let offset = param.offset || 0;
    return this.postService.getAllPosts(limit, offset);
  }

  @Post()
  createNewPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }
}
