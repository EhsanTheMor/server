import { IsString } from 'class-validator';

export class CreateVideoPostCategoryDto {
  @IsString()
  title: string;
}
