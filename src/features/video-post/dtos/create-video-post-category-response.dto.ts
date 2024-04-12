import { Expose } from 'class-transformer';

export class CreateVideoPostCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  createdAt: Date;
}
