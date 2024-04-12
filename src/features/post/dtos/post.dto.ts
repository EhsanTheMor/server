import { Expose, Transform } from 'class-transformer';

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  createdAt: Date;

  @Expose()
  description: string;

  @Expose()
  imageUrl: string;

  @Transform(({ obj }) => obj.category.id)
  @Expose()
  categoryId: number;
}
