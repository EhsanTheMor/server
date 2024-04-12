import { Test, TestingModule } from '@nestjs/testing';
import { VideoPostCategoryService } from './video-post-category.service';

describe('VideoPostCategoryService', () => {
  let service: VideoPostCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoPostCategoryService],
    }).compile();

    service = module.get<VideoPostCategoryService>(VideoPostCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
