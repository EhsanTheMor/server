import { Expose, Transform } from 'class-transformer';

export class CreateTutorialResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.season.id)
  @Expose()
  season: number;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;
}
