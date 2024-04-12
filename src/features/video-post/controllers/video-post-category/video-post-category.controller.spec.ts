import { Test, TestingModule } from '@nestjs/testing';
import { VideoPostCategoryController } from './video-post-category.controller';

describe('VideoPostCategoryController', () => {
  let controller: VideoPostCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoPostCategoryController],
    }).compile();

    controller = module.get<VideoPostCategoryController>(VideoPostCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
