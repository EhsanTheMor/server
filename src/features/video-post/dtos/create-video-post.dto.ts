import { IsNumber, IsString } from 'class-validator';

export class CreateVideoPostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  videoPostCategoryId: number;
}
