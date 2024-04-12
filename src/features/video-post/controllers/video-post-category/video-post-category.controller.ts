import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { VideoPostCategoryService } from '../../services/video-post-category/video-post-category.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateVideoPostCategoryDto } from '../../dtos/create-video-post-category.dto';
import { CreateVideoPostCategoryResponse } from '../../dtos/create-video-post-category-response.dto';

@UseGuards(AuthGuard)
@Controller('video-post-category')
export class VideoPostCategoryController {
  constructor(private videoPostCategoryService: VideoPostCategoryService) {}

  @Get()
  getVideoPostCategories() {
    return this.videoPostCategoryService.getCategories();
  }

  @UseGuards(AdminGuard)
  @Serialize(CreateVideoPostCategoryResponse)
  @Post()
  createNewVideoPostCategory(@Body() body: CreateVideoPostCategoryDto) {
    return this.videoPostCategoryService.createNewVideoPostCategory(body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteVideoPostCatory(@Param('id') id: number) {
    return this.videoPostCategoryService.deleteCategory(id);
  }
}
