import { IsNumber, IsString } from 'class-validator';

export class CreateTutorialDto {
  @IsNumber()
  seasonId: number;

  @IsString()
  title: string;
}
