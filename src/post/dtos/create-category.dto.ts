import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  source: string;

  @IsString()
  destination: string;
}
