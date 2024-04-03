import { Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  crreatedAt: Date;
}
