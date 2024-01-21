import { IsNumber, IsOptional } from 'class-validator';

export class GetAllPostDto {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;
}
