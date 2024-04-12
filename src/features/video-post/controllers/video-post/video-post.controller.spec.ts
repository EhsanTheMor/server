import { Test, TestingModule } from '@nestjs/testing';
import { VideoPostController } from './video-post.controller';

describe('VideoPostController', () => {
  let controller: VideoPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoPostController],
    }).compile();

    controller = module.get<VideoPostController>(VideoPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
