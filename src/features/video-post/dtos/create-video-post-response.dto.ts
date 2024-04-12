import { Expose, Transform } from 'class-transformer';

export class CreateVideoPostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Transform(({ obj }) => obj.videoPostCategory.id)
  @Expose()
  videoPostCategoryId: number;
}
