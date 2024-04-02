import { Expose, Transform } from 'class-transformer';
import { Category } from '../entities/category.entity';

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

  @Expose()
  @Transform(({ value }) => value.id)
  category: Category;
}
