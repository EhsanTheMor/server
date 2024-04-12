import { IsNumber, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsNumber()
  semesterId: number;

  @IsString()
  title: string;
}
