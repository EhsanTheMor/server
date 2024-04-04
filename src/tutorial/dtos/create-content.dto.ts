import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ContentTypes } from '../entities/content.entity';

export class CreateContentDto {
  @IsString()
  description: string;

  // @IsString()
  @IsNumber()
  tutorialId: number;

  // @IsNumber()
  // @IsString()
  @IsEnum(ContentTypes)
  type: number;
}
