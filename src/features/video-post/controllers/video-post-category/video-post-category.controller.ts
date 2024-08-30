import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { VideoPostCategoryService } from '../../services/video-post-category/video-post-category.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateVideoPostCategoryDto } from '../../dtos/create-video-post-category.dto';
import { CreateVideoPostCategoryResponse } from '../../dtos/create-video-post-category-response.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('VideoPostCategory')
@UseGuards(AuthGuard)
@Controller('video-post-category')
export class VideoPostCategoryController {
  constructor(private videoPostCategoryService: VideoPostCategoryService) {}

  @Get()
  getVideoPostCategories() {
    return this.videoPostCategoryService.getCategories();
  }

  @Post()
  @UseGuards(AdminGuard)
  @Serialize(CreateVideoPostCategoryResponse)
  createNewVideoPostCategory(@Body() body: CreateVideoPostCategoryDto) {
    return this.videoPostCategoryService.createNewVideoPostCategory(body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteVideoPostCatory(@Param('id') id: number) {
    return this.videoPostCategoryService.deleteCategory(id);
  }
}
